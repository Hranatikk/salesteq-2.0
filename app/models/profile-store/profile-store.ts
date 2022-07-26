import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ProfileModel, ProfileSnapshotOut } from "../profile/profile"
import { CharacterApi } from "../../services/api/character-api"
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
    saveCharacters: (profileSnapshot: ProfileSnapshotOut) => {
      console.log(profileSnapshot)
      self.profile = profileSnapshot
    },
  }))
  .actions((self) => ({
    getCharacters: async (cb: () => void) => {
      const characterApi = new CharacterApi()
      const result = await characterApi.getCharacters()

      console.log(result)
      if (result.kind === "ok") {
        self.saveCharacters(result.characters)
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
