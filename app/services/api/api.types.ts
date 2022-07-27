import { GeneralApiProblem } from "./api-problem"
import { Profile } from "../../models/profile/profile"

export type GetProfileResult = { kind: "ok"; profile: Profile } | GeneralApiProblem
