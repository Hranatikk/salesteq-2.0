import { FirmStoreModel } from "./firm-store"

test("can be created", () => {
  const instance = FirmStoreModel.create({
    firm: {},
    isFirmFetching: false
  })

  expect(instance).toBeTruthy()
})
