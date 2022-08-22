import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
import { ProfileModel } from "../profile/profile-model"

/**
 * Firm model
 */
export const FirmModel = types.model("Firm").props({
  id: types.identifierNumber,
  title: types.string,
  description: types.maybeNull(types.string),
  structure: types.map(types.frozen()),
})

/**
 * Firm product model
 */
export const FirmProductModel = types.model("FirmProduct").props({
  id: types.identifierNumber,
  title: types.string,
  description: types.maybeNull(types.string),
  code: types.string,
  firm: types.number,
  price: types.number,
})

export const SendedUserInvitationModel = types.model("SendedUserInvitation").props({
  id: types.identifierNumber,
  email: types.string,
  status: types.number,
  user: types.frozen(ProfileModel),
})

export type Firm = Instance<typeof FirmModel>
export type FirmSnapshotOut = SnapshotOut<typeof FirmModel>
export type FirmSnapshotIn = SnapshotIn<typeof FirmModel>
export const createFirmDefaultModel = () => types.optional(FirmModel, {})

export type FirmProduct = Instance<typeof FirmProductModel>
export type FirmProductSnapshotOut = SnapshotOut<typeof FirmProductModel>
export type FirmProductSnapshotIn = SnapshotIn<typeof FirmProductModel>
export const createFirmProductDefaultModel = () => types.optional(FirmProductModel, {})

export type SendedUserInvitation = Instance<typeof SendedUserInvitationModel>
export type SendedUserInvitationSnapshotOut = SnapshotOut<typeof SendedUserInvitationModel>
export type SendedUserInvitationSnapshotIn = SnapshotIn<typeof SendedUserInvitationModel>
export const createSendedUserInvitationDefaultModel = () =>
  types.optional(SendedUserInvitationModel, {})
