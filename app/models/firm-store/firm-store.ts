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
  .actions((self) => ({
    saveFirm: (firmSnapshot: Firm) => {
      self.firm = firmSnapshot
      self.isFirmFetching = false
    },
  }))
  .actions((self) => ({
    errorGetFirm: () => {
      self.isFirmFetching = false
      self.showMessage("Can't load firm details", "danger")
    },
  }))
  .actions((self) => ({
    saveFirmProducts: (productsSnapshot: FirmProduct[]) => {
      self.firmProducts.replace(productsSnapshot)
      self.isProductsFetching = false
    },
  }))
  .actions((self) => ({
    errorGetFirmProducts: () => {
      self.isProductsFetching = false
      self.showMessage("Can't load firm's products", "danger")
    },
  }))
  .actions((self) => ({
    successSellProduct: () => {
      self.isProductsFetching = false
      self.showMessage("Product successfully added", "success")
    },
  }))
  .actions((self) => ({
    errorSellProduct: () => {
      self.isProductsFetching = false
      self.showMessage("Can't add product", "danger")
    },
  }))
  .actions((self) => ({
    errorInviteUser: () => {
      self.isProductsFetching = false
      self.showMessage("Can't invite this user to network", "danger")
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
  .actions((self) => ({
    getFirmProducts: async () => {
      self.isProductsFetching = true
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
  .actions((self) => ({
    sellProduct: async (productId: number, price: number, onSuccess?: () => void) => {
      const {profileStore: { profile }} = getParent(self)
      self.isProductsFetching = true
      const firmApi = new FirmApi()
      const result = await firmApi.sellProduct(productId, profile.id, price)

      if (result.kind === "ok") {
        self.successSellProduct()
        onSuccess && onSuccess()
      } else {
        self.errorSellProduct()
        __DEV__ && console.log(result.kind)

      }
    },
  }))
  .actions((self) => ({
    inviteUserToNetwork: async (userEmail: string, onSuccess?: () => void) => {
      self.isProductsFetching = true
      const firmApi = new FirmApi()
      const result = await firmApi.inviteUserToNetwork(userEmail)

      if (result.kind === "ok") {
        onSuccess && onSuccess()
      } else {
        self.errorSellProduct()
        __DEV__ && console.log(result.kind)

      }
    },
  }))

export interface FirmStore extends Instance<typeof FirmStoreModel> {}
export interface FirmStoreSnapshotOut extends SnapshotOut<typeof FirmStoreModel> {}
export interface FirmStoreSnapshotIn extends SnapshotIn<typeof FirmStoreModel> {}
export const createFirmStoreDefaultModel = () => types.optional(FirmStoreModel, {})
