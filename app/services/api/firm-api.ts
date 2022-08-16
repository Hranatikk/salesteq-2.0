import { ApiResponse, create } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { GetFirmResult, GetFirmProductsResult, GetFirmSingleProductsResult } from "./api.types"

export class FirmApi {
  api = create({
    baseURL: 'http://46.22.223.113',
    headers: {
      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMjQ4NTkwLCJqdGkiOiJkMWRkODA3YWUzNjY0NGIyYmJhYTc2YzUyOWY0YTJjOSIsInVzZXJfaWQiOjJ9.tBiHy3drWoXtWoEDUlnKsRCWQbOADQZL8ANl4rik_70`
    },
  })

  async getFirm(): Promise<GetFirmResult> {
    const response: ApiResponse<any> = await this.api.get("/api/firm/my/")
    console.log(response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data}
  }

  async getFirmProducts(): Promise<GetFirmProductsResult> {
    const response: ApiResponse<any> = await this.api.get("/api/products")

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data}
  }

  async sellProduct(): Promise<GetFirmSingleProductsResult> {
    const response: ApiResponse<any> = await this.api.post(`/api/sale/create/`, {
      product: 4,
      user: 2,
      price: 2499,
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data}
  }
}
