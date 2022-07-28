import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ProfileModel, ProfileStatsOnlyModel, ProfileSnapshotOut, Profile, ProfileStatsOnly } from "../profile/profile"
import { ProfileApi } from "../../services/api/profile-api"
import { withEnvironment } from "../extensions/with-environment"

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
    isConnectionsFetching: types.boolean
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveProfile: (profileSnapshot: ProfileSnapshotOut) => {
      self.profile = profileSnapshot
    },
  }))
  .actions((self) => ({
    saveProfileStats: (profileStatsSnapshot: ProfileStatsOnly) => {
      self.profileStats = profileStatsSnapshot
      self.isProfileFetching = false
    },
  }))
  .actions((self) => ({
    saveProfileConnections: (connections: ProfileSnapshotOut[]) => {
      self.isConnectionsFetching = false
      self.profileConnections.replace(connections)
    },
  }))
  .actions((self) => ({
    getProfileStats: async () => {
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfileStats(self.profile.id)

      if (result.kind === "ok") {
        self.saveProfileStats(result.profileStats)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    getProfile: async () => {
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfile()

      if (result.kind === "ok") {
        self.saveProfile(result.profile)
        self.getProfileStats()
      } else {
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
        self.saveProfileConnections(result.connections)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
  }))

export interface ProfileStore extends Instance<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshotOut extends SnapshotOut<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshotIn extends SnapshotIn<typeof ProfileStoreModel> {}
export const createProfileStoreDefaultModel = () => types.optional(ProfileStoreModel, {})
