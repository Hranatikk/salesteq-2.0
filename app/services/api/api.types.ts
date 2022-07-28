import { GeneralApiProblem } from "./api-problem"
import { Profile, ProfileStatsOnly } from "../../models/profile/profile"
import { Firm, FirmProduct } from "../../models/firm/firm"


// PROFILE
export type GetProfileResult = { kind: "ok"; data: Profile } | GeneralApiProblem
export type GetProfileConnectionsResult = { kind: "ok"; data: Profile[] } | GeneralApiProblem
export type GetProfileStatsOnlyResult = { kind: "ok"; data: ProfileStatsOnly } | GeneralApiProblem

// SALE_HISTORY
export type GetSaleHistoryResult = { kind: "ok"; data: any } | GeneralApiProblem

// FIRM
export type GetFirmResult = { kind: "ok"; data: Firm } | GeneralApiProblem
export type GetFirmRProductsResult = { kind: "ok"; data: FirmProduct[] } | GeneralApiProblem
