import { ProfileStoreModel } from "./profile-store"

test("can be created", () => {
  const instance = ProfileStoreModel.create({
    profile: {},
    profileStats: {},
  })

  expect(instance).toBeTruthy()
})
