import { GeneralApiProblem } from "./api-problem"
import { Profile, ProfileStatsOnly, SignInResult } from "../../models/profile/profile-model"
import { Firm, FirmProduct, SendedUserInvitation } from "../../models/firm/firm-model"

// PROFILE
export type GetProfileResult = { kind: "ok"; data: Profile } | GeneralApiProblem
export type GetProfileConnectionsResult = { kind: "ok"; data: Profile[] } | GeneralApiProblem
export type GetProfileStatsOnlyResult = { kind: "ok"; data: ProfileStatsOnly } | GeneralApiProblem
export type GetSignInResult = { kind: "ok"; data: SignInResult } | GeneralApiProblem
export type GetLogOutResult = { kind: "ok"; data: string } | GeneralApiProblem

// SALE_HISTORY
export type GetSaleHistoryResult = { kind: "ok"; data: any } | GeneralApiProblem

// FIRM
export type GetFirmResult = { kind: "ok"; data: Firm } | GeneralApiProblem
export type GetFirmProductsResult = { kind: "ok"; data: FirmProduct[] } | GeneralApiProblem
export type GetFirmSingleProductsResult = { kind: "ok"; data: FirmProduct } | GeneralApiProblem
export type SendUserInvitation = { kind: "ok"; data: SendedUserInvitation } | GeneralApiProblem
