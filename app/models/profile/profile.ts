import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
import { number } from "mobx-state-tree/dist/internal"

/**
 * Profile model
 */

export const ProfileDataModel = types.model("ProfileData")
  .props({
    rank: types.number,
    revenue: types.number,
    turnover: types.number,
    starting_turnover: types.number
  })

export const ProfileModel = types
  .model("Profile")
  .props({
    id: types.identifierNumber,
    email: types.string,
    first_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    patronymic: types.maybeNull(types.string),
    supervisor: types.maybeNull(types.string),
    data: types.maybeNull(types.map(types.frozen())),
    stats: types.maybeNull(types.model()),
  })

export interface Profile extends Instance<typeof ProfileModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> {}
export const createProfileDefaultModel = () => types.optional(ProfileModel, {})
