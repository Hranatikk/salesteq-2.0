import { GeneralApiProblem } from "./api-problem"
import { Profile, ProfileStatsOnly } from "../../models/profile/profile"
import { Firm } from "../../models/firm/firm"

export type GetProfileResult = { kind: "ok"; profile: Profile } | GeneralApiProblem
export type GetProfileStatsOnlyResult = { kind: "ok"; profileStats: ProfileStatsOnly } | GeneralApiProblem

export type GetFirmResult = { kind: "ok"; firm: Firm } | GeneralApiProblem