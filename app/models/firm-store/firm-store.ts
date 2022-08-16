import { Instance, SnapshotIn, SnapshotOut, types, getParent } from "mobx-state-tree"
import { FirmModel, Firm, FirmProductModel, FirmProduct } from "../firm/firm"
import { FirmApi } from "../../services/api/firm-api"
import { withEnvironment } from "../extensions/with-environment"
import { showMessage } from "react-native-flash-message";

/**
 * Stroing user data
 */
export const FirmStoreModel = types
  .model("FirmStore")
  .props({
    firm: types.maybeNull(FirmModel),
    isFirmFetching: types.boolean,

    firmProducts: types.optional(types.array(FirmProductModel), []),
    isProductsFetching: types.boolean
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveFirm: (firmSnapshot: Firm) => {
      self.firm = firmSnapshot
      self.isFirmFetching = false
    },
  }))
  .actions((self) => ({
    saveFirmProducts: (productsSnapshot: FirmProduct[]) => {
      self.firmProducts.replace(productsSnapshot)
      self.isProductsFetching = false
    },
  }))
  .actions((self) => ({
    getFirm: async () => {
      self.isFirmFetching = true
      const firmApi = new FirmApi()
      const result = await firmApi.getFirm()

      if (result.kind === "ok") {
        self.saveFirm(result.data)
      } else {
        __DEV__ && console.log(result.kind)

      }
    },
  }))
  .actions((self) => ({
    getFirmProducts: async () => {
      self.isProductsFetching = true
      const firmApi = new FirmApi()
      const result = await firmApi.getFirmProducts()

      if (result.kind === "ok") {
        self.saveFirmProducts(result.data)
      } else {
        showMessage({
          message: "Something went wrong",
          type: "danger",
          icon: "danger",
          position: "bottom",
        })
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    sellProduct: async () => {
      self.isProductsFetching = true
      const firmApi = new FirmApi()
      const result = await firmApi.sellProduct()

      if (result.kind === "ok") {
        // self.saveFirm(result.data)
      } else {
        __DEV__ && console.log(result.kind)

      }
    },
  }))

export interface FirmStore extends Instance<typeof FirmStoreModel> {}
export interface FirmStoreSnapshotOut extends SnapshotOut<typeof FirmStoreModel> {}
export interface FirmStoreSnapshotIn extends SnapshotIn<typeof FirmStoreModel> {}
export const createFirmStoreDefaultModel = () => types.optional(FirmStoreModel, {})
