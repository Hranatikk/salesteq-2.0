import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProfileStoreModel } from "../profile-store/profile-store"
import { FirmStoreModel } from "../firm-store/firm-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  profileStore: types.optional(ProfileStoreModel, {
    profile: null,
    profileStats: null,
    isProfileFetching: true,
  } as any),
  firmStore: types.optional(FirmStoreModel, {
    firm: null,
    isFirmFetching: false
  } as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
