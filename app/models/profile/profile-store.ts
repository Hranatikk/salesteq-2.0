import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import {
  ProfileModel,
  ProfileStatsOnlyModel,
  ProfileSnapshotOut,
  ProfileStatsOnly,
} from "./profile-model"
import { ProfileApi } from "../../services/api/profile-api"
import { withEnvironment } from "../extensions/with-environment"
import { translate } from "../../i18n/"
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
    errorGetProfile: types.maybeNull(types.string),

    profileConnections: types.optional(types.array(ProfileModel), []),
    isConnectionsFetching: types.boolean,
    errorGetConnections: types.maybeNull(types.string),

    isTokenFetching: types.boolean,
    accessToken: types.maybeNull(types.string),
    errorGetAccessToken: types.maybeNull(types.string),
  })
  .extend(withEnvironment)
  .actions(() => ({
    showErrorMessage: (message: string, type: "danger" | "success") => {
      showMessage({
        message: message,
        type: type,
        icon: type,
        position: "bottom",
      })
    },
  }))
  /**
   * Get user profile stats
   */
  .actions((self) => ({
    saveProfileStats: (profileStatsSnapshot: ProfileStatsOnly) => {
      self.profileStats = profileStatsSnapshot
      self.isProfileFetching = false
      self.errorGetProfile = null
    },
  }))
  .actions((self) => ({
    failGetProfileStats: () => {
      self.isProfileFetching = false
      self.errorGetProfile = translate("errors.errorOccured", {name: translate("common.profileStatsLoading")}) 
      self.showErrorMessage(translate("errors.loadProfileStats"), "danger")
    },
  }))
  .actions((self) => ({
    getProfileStats: async () => {
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfileStats(self.profile.id)

      if (result.kind === "ok") {
        self.saveProfileStats(result.data)
      } else {
        self.failGetProfileStats()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  /**
   * Get user profile information
   */
  .actions((self) => ({
    saveProfile: (profileSnapshot: ProfileSnapshotOut) => {
      self.profile = profileSnapshot
    },
  }))
  .actions((self) => ({
    failGetProfile: () => {
      self.isProfileFetching = false
      self.errorGetProfile = translate("errors.errorOccured", {name: translate("common.profileInfoLoading")}) 
      self.showErrorMessage(translate("errors.loadProfileInfo"), "danger")
    },
  }))
  .actions((self) => ({
    getProfile: async () => {
      self.isProfileFetching = true
      self.errorGetProfile = null
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfile()

      if (result.kind === "ok") {
        self.saveProfile(result.data)
        self.getProfileStats()
      } else {
        self.failGetProfile()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  /**
   * Get user network
   */
  .actions((self) => ({
    saveProfileConnections: (connections: ProfileSnapshotOut[]) => {
      self.isConnectionsFetching = false
      self.errorGetConnections = null
      self.profileConnections.replace(connections)
    },
  }))
  .actions((self) => ({
    failGetProfileConnections: () => {
      self.isConnectionsFetching = false
      self.errorGetConnections = translate("errors.errorOccured", {name: translate("common.connectionsFetching")})
      self.showErrorMessage(translate("errors.loadYourNetwork"), "danger")
    },
  }))
  .actions((self) => ({
    getProfileConnections: async () => {
      self.isConnectionsFetching = true
      self.errorGetConnections = null
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfileConnections()

      if (result.kind === "ok") {
        self.saveProfileConnections(result.data)
      } else {
        self.failGetProfileConnections()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  /**
   * Profile sign in / logout
   */
  .actions((self) => ({
    saveAccessToken: (accessToken: string) => {
      self.isTokenFetching = false
      self.accessToken = accessToken
    },
  }))
  .actions((self) => ({
    failFetchAccessToken: (error: string) => {
      self.isTokenFetching = false
      self.accessToken = null
      self.errorGetAccessToken = error
    },
  }))
  .actions((self) => ({
    signIn: async (email: string, password: string) => {
      self.isTokenFetching = true
      self.errorGetAccessToken = null
      const profileApi = new ProfileApi()
      const result = await profileApi.signIn(email, password)

      if (result.kind === "ok") {
        self.saveAccessToken(result.data.access)
      } else {
        self.failFetchAccessToken(translate("errors.findUserWithCredentials"))
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
