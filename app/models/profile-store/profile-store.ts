import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ProfileModel, ProfileSnapshotOut } from "../profile/profile"
import { ProfileApi } from "../../services/api/profile-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Stroing user data
 */
export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profile: types.maybe(ProfileModel),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveProfile: (profileSnapshot: ProfileSnapshotOut) => {
      self.profile = profileSnapshot
    },
  }))
  .actions((self) => ({
    getProfile: async (cb: () => void) => {
      const profileApi = new ProfileApi()
      const result = await profileApi.getProfile()

      if (result.kind === "ok") {
        self.saveProfile(result.profile)
        cb()
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
  }))

export interface ProfileStore extends Instance<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshotOut extends SnapshotOut<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshotIn extends SnapshotIn<typeof ProfileStoreModel> {}
export const createProfileStoreDefaultModel = () => types.optional(ProfileStoreModel, {})
