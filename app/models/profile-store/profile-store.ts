import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ProfileModel, ProfileStatsOnlyModel, ProfileSnapshotOut, ProfileStatsOnlySnapshotOut } from "../profile/profile"
import { ProfileApi } from "../../services/api/profile-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Stroing user data
 */
export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profile: types.maybe(ProfileModel),
    profileStats: types.maybe(ProfileStatsOnlyModel),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveProfile: (profileSnapshot: ProfileSnapshotOut) => {
      self.profile = profileSnapshot
    },
  }))
  .actions((self) => ({
    saveProfileStats: (profileStatsSnapshot: ProfileStatsOnlySnapshotOut) => {
      console.log(profileStatsSnapshot)
      self.profileStats = profileStatsSnapshot
    },
  }))
  .actions((self) => ({
    getProfileStats: async () => {
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfileStats(self.profile.id)

      if (result.kind === "ok") {
        console.log(result)
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

export interface ProfileStore extends Instance<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshotOut extends SnapshotOut<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshotIn extends SnapshotIn<typeof ProfileStoreModel> {}
export const createProfileStoreDefaultModel = () => types.optional(ProfileStoreModel, {})
