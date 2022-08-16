import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"

/**
 * Firm model
 */
export const FirmModel = types
  .model("Firm")
  .props({
    id: types.identifierNumber,
    title: types.string,
    description: types.maybeNull(types.string),
    structure: types.map(types.frozen())
  })

/**
 * Firm product model
 */
export const FirmProductModel = types
  .model("Firm")
  .props({
    id: types.identifierNumber,
    title: types.string,
    description: types.maybeNull(types.string),
    code: types.string,
    firm: types.number,
    price: types.number
  })

export interface Firm extends Instance<typeof FirmModel> {}
export interface FirmSnapshotOut extends SnapshotOut<typeof FirmModel> {}
export interface FirmSnapshotIn extends SnapshotIn<typeof FirmModel> {}
export const createFirmDefaultModel = () => types.optional(FirmModel, {})

export interface FirmProduct extends Instance<typeof FirmProductModel> {}
export interface FirmProductSnapshotOut extends SnapshotOut<typeof FirmProductModel> {}
export interface FirmProductSnapshotIn extends SnapshotIn<typeof FirmProductModel> {}
export const createFirmProductDefaultModel = () => types.optional(FirmProductModel, {})
