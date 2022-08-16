import { ApiResponse, create } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { GetProfileResult, GetProfileConnectionsResult, GetProfileStatsOnlyResult, GetSaleHistoryResult } from "./api.types"

export class ProfileApi {
  api = create({
    baseURL: 'http://46.22.223.113',
    headers: {
      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMjQ4NTkwLCJqdGkiOiJkMWRkODA3YWUzNjY0NGIyYmJhYTc2YzUyOWY0YTJjOSIsInVzZXJfaWQiOjJ9.tBiHy3drWoXtWoEDUlnKsRCWQbOADQZL8ANl4rik_70`
    },
  })

  async getProfile(): Promise<GetProfileResult> {
    const response: ApiResponse<any> = await this.api.get("/api/user/me/")

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data}
  }

  async getProfileStats(userId:number|string): Promise<GetProfileStatsOnlyResult> {
    const response: ApiResponse<any> = await this.api.get(`/api/user/${userId}/stats/`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data.stats}
  }

  async getProfileConnections(): Promise<GetProfileConnectionsResult> {
    const response: ApiResponse<any> = await this.api.get(`/api/my/users/`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data}
  }

  async getProfileConnectionsByUserId(userId:number|string): Promise<GetProfileConnectionsResult> {
    const response: ApiResponse<any> = await this.api.get(`/api/supervisor/${userId}/users/`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data}
  }

  async getUserSales(userId:number|string, withStructure:boolean): Promise<GetSaleHistoryResult> {
    const response: ApiResponse<any> = await this.api.get(`/api/sale?${withStructure ? `for_user_id_with_structure` : `for_user_id`}=${userId}`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data}
  }

  async getUserRevenues(userId:number|string, withStructure:boolean): Promise<GetSaleHistoryResult> {
    const response: ApiResponse<any> = await this.api.get(`/api/revenue?${withStructure ? `for_user_id_with_structure` : `for_user_id`}=${userId}`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {kind: "ok", data: response.data}
  }
}
