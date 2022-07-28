import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { FirmModel, Firm } from "../firm/firm"
import { FirmApi } from "../../services/api/firm-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Stroing user data
 */
export const FirmStoreModel = types
  .model("FirmStore")
  .props({
    firm: types.maybeNull(FirmModel),
    isFirmFetching: types.boolean
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveFirm: (firmSnapshot: Firm) => {
      self.firm = firmSnapshot
    },
  }))
  .actions((self) => ({
    getFirm: async () => {
      const firmApi = new FirmApi()
      const result = await firmApi.getFirm()

      if (result.kind === "ok") {
        self.saveFirm(result.firm)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
  }))

export interface FirmStore extends Instance<typeof FirmStoreModel> {}
export interface FirmStoreSnapshotOut extends SnapshotOut<typeof FirmStoreModel> {}
export interface FirmStoreSnapshotIn extends SnapshotIn<typeof FirmStoreModel> {}
export const createFirmStoreDefaultModel = () => types.optional(FirmStoreModel, {})
