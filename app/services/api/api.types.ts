import { GeneralApiProblem } from "./api-problem"
import { Profile, ProfileStatsOnly } from "../../models/profile/profile"

export type GetProfileResult = { kind: "ok"; profile: Profile } | GeneralApiProblem
export type GetProfileStatsOnlyResult = { kind: "ok"; profileStats: ProfileStatsOnly } | GeneralApiProblem
