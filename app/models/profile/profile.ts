import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"

/**
 * Profile model
 */
export const ProfileModel = types
  .model("Profile")
  .props({
    id: types.identifierNumber,
    first_name: types.maybe(types.string),
  })

export interface Profile extends Instance<typeof ProfileModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> {}
export const createProfileDefaultModel = () => types.optional(ProfileModel, {})
