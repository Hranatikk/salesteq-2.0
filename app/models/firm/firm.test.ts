import { FirmModel } from "./firm"

test("can be created", () => {
  const instance = FirmModel.create({
    id: 1,
    title: "Title",
    description: null,
    structure: {}
  })

  expect(instance).toBeTruthy()
})
