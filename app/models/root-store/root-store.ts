import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProfileStoreModel } from "../profile/profile-store"
import { FirmStoreModel } from "../firm/firm-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  profileStore: types.optional(ProfileStoreModel, {
    profile: null,
    profileStats: null,
    isProfileFetching: true,

    profileConnections: [],
    isConnectionsFetching: false,
  } as any),
  firmStore: types.optional(FirmStoreModel, {
    firm: null,
    isFirmFetching: false,

    firmProducts: [],
    isProductsFetching: false,
    isProductSaving: false
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
