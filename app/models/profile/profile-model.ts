import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"

/**
 * Profile model
 */

export const StatsStructureModel = types.model("StatsStructure").props({
  title: types.string,
  description: types.string,
  type: types.string,
  data: types.array(
    types.frozen({
      title: types.string,
      amount: types.number,
    }),
  ),
})

export const StatsGeneralModel = types.model("StatsGeneral").props({
  title: types.string,
  description: types.string,
  type: types.string,
  data: types.union(
    types.number,
    types.array(
      types.frozen({
        datetime__date: types.string,
        count: types.number,
        sum: types.number,
      }),
    ),
  ),
})

export const StatsLevelingModel = types.model("StatsLeveling").props({
  current: types.map(
    types.frozen({
      title: types.string,
    }),
  ),
  next: types.map(
    types.frozen({
      title: types.string,
      conditions: types.array(
        types.model({
          title: types.string,
          description: types.string,
          type: types.string,
          current: types.number,
          needed: types.number,
        }),
      ),
    }),
  ),
})

export const ProfileDataModel = types.model("ProfileData").props({
  rank: types.number,
  revenue: types.number,
  turnover: types.number,
  starting_turnover: types.number,
})

export const ProfileModel = types.model("Profile").props({
  id: types.identifierNumber,
  email: types.string,
  first_name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
  patronymic: types.maybeNull(types.string),
  supervisor: types.maybeNull(types.union(types.string, types.number)),
  data: types.maybeNull(types.frozen(ProfileDataModel)),
})

export const ProfileStatsOnlyModel = types.model("ProfileStatsOnly").props({
  leveling: types.frozen(StatsLevelingModel),
  general: types.array(StatsGeneralModel),
  structure: types.array(StatsStructureModel),
})

export const SignInResultModel = types.model("SignInResult").props({
  refresh: types.string,
  access: types.string,
})

export type Profile = Instance<typeof ProfileModel>
export type ProfileSnapshotOut = SnapshotOut<typeof ProfileModel>
export type ProfileSnapshotIn = SnapshotIn<typeof ProfileModel>
export const createProfileDefaultModel = () => types.optional(ProfileModel, {})

export type ProfileStatsOnly = Instance<typeof ProfileStatsOnlyModel>
export type ProfileStatsOnlySnapshotOut = SnapshotOut<typeof ProfileStatsOnlyModel>
export type ProfileStatsOnlySnapshotIn = SnapshotIn<typeof ProfileStatsOnlyModel>
export const createProfileStatsOnlyDefaultModel = () => types.optional(ProfileStatsOnlyModel, {})

export type SignInResult = Instance<typeof SignInResultModel>
export type SignInResultSnapshotOut = SnapshotOut<typeof SignInResultModel>
export type SignInResultSnapshotIn = SnapshotIn<typeof SignInResultModel>
export const createSignInResultDefaultModel = () => types.optional(SignInResultModel, {})
