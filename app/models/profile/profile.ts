import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"

/**
 * Profile model
 */

export const StatsStructureModel = types.model("StatsStructure")
  .props({
    title: types.string,
    description: types.string,
    type: types.string,
    data: types.array(types.frozen({
      title: types.string,
      amount: types.number
    }))
  })

export const StatsGeneralModel = types.model("StatsGeneral")
  .props({
    title: types.string,
    description: types.string,
    type: types.string,
    data: types.union(types.number, types.array(types.frozen({
      datetime__date: types.string,
      count: types.number,
      sum: types.number
    })))
  })

export const StatsLevelingModel = types.model("StatsLeveling")
  .props({
    current: types.map(types.frozen({
      title: types.string
    })),
    next: types.map(types.frozen({
      title: types.string,
      conditions: types.array(types.model({
        title: types.string,
        description: types.string,
        type: types.string,
        current: types.number,
        needed: types.number
      }))
    })),
  })

export const ProfileDataModel = types.model("ProfileData")
  .props({
    rank: types.number,
    revenue: types.number,
    turnover: types.number,
    starting_turnover: types.number
  })

export const ProfileModel = types
  .model("Profile")
  .props({
    id: types.identifierNumber,
    email: types.string,
    first_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    patronymic: types.maybeNull(types.string),
    supervisor: types.maybeNull(types.string),
    data: types.maybeNull(types.frozen(ProfileDataModel)),
  })

export const ProfileStatsOnlyModel = types
  .model("ProfileStatsOnly")
  .props({
    leveling: types.frozen(StatsLevelingModel),
    general: types.array(StatsGeneralModel),
    structure: types.array(StatsStructureModel),
  })

export interface Profile extends Instance<typeof ProfileModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> {}
export const createProfileDefaultModel = () => types.optional(ProfileModel, {})

export interface ProfileStatsOnly extends Instance<typeof ProfileStatsOnlyModel> {}
export interface ProfileStatsOnlySnapshotOut extends SnapshotOut<typeof ProfileStatsOnlyModel> {}
export interface ProfileStatsOnlySnapshotIn extends SnapshotIn<typeof ProfileStatsOnlyModel> {}
export const createProfileStatsOnlyDefaultModel = () => types.optional(ProfileStatsOnlyModel, {})
