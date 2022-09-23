import { Instance, SnapshotIn, SnapshotOut, types, getParent } from "mobx-state-tree"
import { FirmModel, Firm, FirmProductModel, FirmProduct } from "./firm-model"
import { FirmApi } from "../../services/api/firm-api"
import { withEnvironment } from "../extensions/with-environment"
import { translate } from "../../i18n/"
import { showMessage } from "react-native-flash-message"

/**
 * Store firm data
 */
export const FirmStoreModel = types
  .model("FirmStore")
  .props({
    firm: types.maybeNull(FirmModel),
    isFirmFetching: types.boolean,

    firmProductsList: types.optional(types.array(FirmProductModel), []),
    isProductsListFetching: types.boolean,
    isProductInProgressOfSaving: types.boolean,
  })
  .extend(withEnvironment)
  .actions(() => ({
    showMessage: (message: string, type: "danger" | "success") => {
      showMessage({
        message: message,
        type: type,
        icon: type,
        position: "bottom",
      })
    },
  }))
  /**
   * Get firm info
   */
  .actions((self) => ({
    saveFirm: (firmSnapshot: Firm) => {
      self.firm = firmSnapshot
      self.isFirmFetching = false
    },
  }))
  .actions((self) => ({
    errorGetFirm: () => {
      self.isFirmFetching = false
      self.showMessage(translate("errors.loadFirmDetails"), "danger")
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
        self.errorGetFirm()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  /**
   * Get firm products
   */
  .actions((self) => ({
    saveFirmProducts: (productsSnapshot: FirmProduct[]) => {
      self.firmProductsList.replace(productsSnapshot)
      self.isProductsListFetching = false
    },
  }))
  .actions((self) => ({
    errorGetFirmProducts: () => {
      self.isProductsListFetching = false
      self.showMessage(translate("errors.loadFirmProducts"), "danger")
    },
  }))
  .actions((self) => ({
    getFirmProducts: async () => {
      self.isProductsListFetching = true
      const firmApi = new FirmApi()
      const result = await firmApi.getFirmProducts()

      if (result.kind === "ok") {
        self.saveFirmProducts(result.data)
      } else {
        self.errorGetFirmProducts()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  /**
   * Sell firm products
   */
  .actions((self) => ({
    successSellProduct: (text?: string) => {
      self.isProductInProgressOfSaving = false
      self.showMessage(text ? text : translate("success.productAdded"), "success")
    },
  }))
  .actions((self) => ({
    errorSellProduct: (text?: string) => {
      self.isProductInProgressOfSaving = false
      self.showMessage(text ? text : translate("errors.addProduct"), "danger")
    },
  }))
  .actions((self) => ({
    sellProduct: async (
      productId: number,
      price: number,
      onSuccess?: () => void,
      successText?: string,
    ) => {
      const {
        profileStore: { profile },
      } = getParent(self)
      self.isProductInProgressOfSaving = true
      const firmApi = new FirmApi()
      const result = await firmApi.sellProduct(productId, profile.id, price)

      if (result.kind === "ok") {
        self.successSellProduct(successText)
        onSuccess && onSuccess()
      } else {
        self.errorSellProduct()
        __DEV__ && console.log(result.kind)
      }
    },
  }))
  /**
   * User invitation to firm
   */
  .actions((self) => ({
    inviteUser: () => {
      self.isProductInProgressOfSaving = false
      self.showMessage(translate("errors.inviteUser"), "danger")
    },
  }))
  .actions((self) => ({
    inviteUserToNetwork: async (userEmail: string, onSuccess?: () => void) => {
      self.isProductInProgressOfSaving = true
      const firmApi = new FirmApi()
      const result = await firmApi.inviteUserToNetwork(userEmail)

      if (result.kind === "ok") {
        onSuccess && onSuccess()
      } else {
        self.errorSellProduct(translate("errors.inviteUser"))
        __DEV__ && console.log(result.kind)
      }
    },
  }))

export type FirmStore = Instance<typeof FirmStoreModel>
export type FirmStoreSnapshotOut = SnapshotOut<typeof FirmStoreModel>
export type FirmStoreSnapshotIn = SnapshotIn<typeof FirmStoreModel>
export const createFirmStoreDefaultModel = () => types.optional(FirmStoreModel, {})
