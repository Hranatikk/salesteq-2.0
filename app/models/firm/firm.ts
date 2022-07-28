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

export interface Firm extends Instance<typeof FirmModel> {}
export interface FirmSnapshotOut extends SnapshotOut<typeof FirmModel> {}
export interface FirmSnapshotIn extends SnapshotIn<typeof FirmModel> {}
export const createFirmDefaultModel = () => types.optional(FirmModel, {})
