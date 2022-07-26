import { ProfileModel } from "./profile"

test("can be created", () => {
  const instance = ProfileModel.create({
    id: 1,
    name: "Rick"
  })

  expect(instance).toBeTruthy()
})
