import { ApiResponse, create } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import * as storage from "../../utils/storage"
import {
  GetProfileResult,
  GetProfileConnectionsResult,
  GetProfileStatsOnlyResult,
  GetSaleHistoryResult,
  GetSignInResult,
  GetLogOutResult,
} from "./api.types"

export class ProfileApi {
  api = create({
    baseURL: "http://46.22.223.113",
  })

  /**
   * Get user profile info
   *
   */
  async getProfile(): Promise<GetProfileResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.get("/api/user/me/")

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data }
  }

  /**
   * Get profile stats by user id
   *
   * @param userId userId to get stats
   */
  async getProfileStats(userId: number | string): Promise<GetProfileStatsOnlyResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.get(`/api/user/${userId}/stats/`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data.stats }
  }

  /**
   * Get own profile connections
   *
   */
  async getProfileConnections(): Promise<GetProfileConnectionsResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.get("/api/my/users/")

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data }
  }

  /**
   * Get profile connections by user id
   *
   * @param userId userId to get connections
   */
  async getProfileConnectionsByUserId(
    userId: number | string,
  ): Promise<GetProfileConnectionsResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.get(`/api/supervisor/${userId}/users/`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data }
  }

  /**
   * Get user sales list
   *
   * @param userId id of the user
   * @param withStructure get only own sales or sales with users in network
   */
  async getUserSales(
    userId: number | string,
    withStructure: boolean,
  ): Promise<GetSaleHistoryResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.get(
      `/api/sale?${withStructure ? "for_user_id_with_structure" : "for_user_id"}=${userId}`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data }
  }

  /**
   * Get user revenues list
   *
   * @param userId id of the user
   * @param withStructure get only own revenues or sales with users in network
   */
  async getUserRevenues(
    userId: number | string,
    withStructure: boolean,
  ): Promise<GetSaleHistoryResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.get(
      `/api/revenue?${withStructure ? "for_user_id_with_structure" : "for_user_id"}=${userId}`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data }
  }

  /**
   * Token refresh
   *
   * @param refreshToken refresh token for getting new access token
   */
  async refreshToken(refreshToken: string): Promise<GetSignInResult> {
    const response: ApiResponse<any> = await this.api.post("auth_djoser/jwt/refresh", {
      refresh: refreshToken,
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    this.api.setHeaders({
      Authorization: `Bearer ${response.data.access}`,
    })
    await storage.save("@access_token", response.data.access)
    return { kind: "ok", data: response.data }
  }

  /**
   * User authorization
   *
   * @param email user email
   * @param password user password
   */
  async signIn(email: string, password: string): Promise<GetSignInResult> {
    const response: ApiResponse<any> = await this.api.post("auth_djoser/jwt/create", {
      email,
      password,
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    this.api.setHeaders({
      Authorization: `Bearer ${response.data.access}`,
    })
    await storage.save("@access_token", response.data.access)
    await storage.save("@refresh_token", response.data.refresh)
    return { kind: "ok", data: response.data }
  }

  /**
   * User log out
   */
  async logout(): Promise<GetLogOutResult> {
    await storage.remove("@access_token")
    await storage.remove("@refresh_token")
    return { kind: "ok", data: "success" }
  }
}
