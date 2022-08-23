import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import {
  ProfileModel,
  ProfileStatsOnlyModel,
  ProfileSnapshotOut,
  ProfileStatsOnly,
} from "./profile-model"
import { ProfileApi } from "../../services/api/profile-api"
import { withEnvironment } from "../extensions/with-environment"
import { showMessage } from "react-native-flash-message"

/**
 * Storing user data
 */
export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profile: types.maybeNull(ProfileModel),
    profileStats: types.maybeNull(ProfileStatsOnlyModel),
    isProfileFetching: types.boolean,

    profileConnections: types.optional(types.array(ProfileModel), []),
    isConnectionsFetching: types.boolean,

    isTokenFetching: types.boolean,
    accessToken: types.maybeNull(types.string),
    errorGetAccessToken: types.maybeNull(types.string),
  })
  .extend(withEnvironment)
  .actions(() => ({
    showErrorMessage: (message: string) => {
      showMessage({
        message: message,
        type: "danger",
        icon: "danger",
        position: "bottom",
      })
    },
  }))
  .actions((self) => ({
    saveProfile: (profileSnapshot: ProfileSnapshotOut) => {
      self.profile = profileSnapshot
    },
  }))
  .actions((self) => ({
    errorGetProfile: () => {
      self.isProfileFetching = false
      self.showErrorMessage("Can't load profile information")
    },
  }))
  .actions((self) => ({
    saveProfileStats: (profileStatsSnapshot: ProfileStatsOnly) => {
      self.profileStats = profileStatsSnapshot
      self.isProfileFetching = false
    },
  }))
  .actions((self) => ({
    errorGetProfileStats: () => {
      self.isProfileFetching = false
      self.showErrorMessage("Can't load profile statistics")
    },
  }))
  .actions((self) => ({
    saveProfileConnections: (connections: ProfileSnapshotOut[]) => {
      self.isConnectionsFetching = false
      self.profileConnections.replace(connections)
    },
  }))
  .actions((self) => ({
    errorGetProfileConnections: () => {
      self.isConnectionsFetching = false
      self.showErrorMessage("Can't load your network")
    },
  }))
  .actions((self) => ({
    saveAccessToken: (accessToken: string) => {
      self.isTokenFetching = false
      self.accessToken = accessToken
    },
  }))
  .actions((self) => ({
    errorFetchAccessToken: (error: string) => {
      self.isTokenFetching = false
      self.accessToken = null
      self.errorGetAccessToken = error
    },
  }))
  .actions((self) => ({
    getProfileStats: async () => {
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfileStats(self.profile.id)

      if (result.kind === "ok") {
        self.saveProfileStats(result.data)
      } else {
        self.errorGetProfileStats()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    getProfile: async () => {
      self.isProfileFetching = true
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfile()

      if (result.kind === "ok") {
        self.saveProfile(result.data)
        self.getProfileStats()
      } else {
        self.errorGetProfile()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    getProfileConnections: async () => {
      self.isConnectionsFetching = true
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfileConnections()

      if (result.kind === "ok") {
        self.saveProfileConnections(result.data)
      } else {
        self.errorGetProfileConnections()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    signIn: async (email: string, password: string) => {
      self.isConnectionsFetching = true
      self.errorGetAccessToken = null
      const profileApi = new ProfileApi()
      const result = await profileApi.signIn(email, password)

      if (result.kind === "ok") {
        self.saveAccessToken(result.data.access)
      } else {
        self.errorFetchAccessToken("no such user")
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    logout: async () => {
      self.isTokenFetching = false
      self.accessToken = null
      self.errorGetAccessToken = null

      const profileApi = new ProfileApi()
      await profileApi.logout()
    },
  }))

export type ProfileStore = Instance<typeof ProfileStoreModel>
export type ProfileStoreSnapshotOut = SnapshotOut<typeof ProfileStoreModel>
export type ProfileStoreSnapshotIn = SnapshotIn<typeof ProfileStoreModel>
export const createProfileStoreDefaultModel = () => types.optional(ProfileStoreModel, {})
