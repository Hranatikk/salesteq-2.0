import { ProfileModel } from "./profile"

test("can be created", () => {
  const instance = ProfileModel.create({
    id: 1,
    email: "test@test.co,",
    first_name: "Name",
    last_name: "Surnmae",
    patronymic: null,
    supervisor: null,
    data: {},
  })

  expect(instance).toBeTruthy()
})
