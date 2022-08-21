import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
import { ProfileModel } from "../profile/profile-model"

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
  .model("FirmProduct")
  .props({
    id: types.identifierNumber,
    title: types.string,
    description: types.maybeNull(types.string),
    code: types.string,
    firm: types.number,
    price: types.number
  })

export const SendedUserInvitationModel = types
  .model("SendedUserInvitation")
  .props({
    id: types.identifierNumber,
    email: types.string,
    status: types.number,
    user: types.frozen(ProfileModel)
  })

export interface Firm extends Instance<typeof FirmModel> {}
export interface FirmSnapshotOut extends SnapshotOut<typeof FirmModel> {}
export interface FirmSnapshotIn extends SnapshotIn<typeof FirmModel> {}
export const createFirmDefaultModel = () => types.optional(FirmModel, {})

export interface FirmProduct extends Instance<typeof FirmProductModel> {}
export interface FirmProductSnapshotOut extends SnapshotOut<typeof FirmProductModel> {}
export interface FirmProductSnapshotIn extends SnapshotIn<typeof FirmProductModel> {}
export const createFirmProductDefaultModel = () => types.optional(FirmProductModel, {})

export interface SendedUserInvitation extends Instance<typeof SendedUserInvitationModel> {}
export interface SendedUserInvitationSnapshotOut extends SnapshotOut<typeof SendedUserInvitationModel> {}
export interface SendedUserInvitationSnapshotIn extends SnapshotIn<typeof SendedUserInvitationModel> {}
export const createSendedUserInvitationDefaultModel = () => types.optional(SendedUserInvitationModel, {})
