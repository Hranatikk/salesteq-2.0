import { ApiResponse, create } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import * as storage from "../../utils/storage"
import { GetFirmResult, GetFirmProductsResult, GetFirmSingleProductsResult } from "./api.types"

export class FirmApi {
  api = create({
    baseURL: "http://salesteq.info",
  })

  /**
   * Get user firm
   *
   */
  async getFirm(): Promise<GetFirmResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.get("/api/firm/my/")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data }
  }

  /**
   * Get firm products
   *
   */
  async getFirmProducts(): Promise<GetFirmProductsResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.get("/api/products")

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data }
  }

  /**
   * Sell product
   *
   * @param productId id of the selled product
   * @param userId id of the user who done this sale
   * @param price price of the product
   */
  async sellProduct(
    productId: number,
    userId: number,
    price: number,
  ): Promise<GetFirmSingleProductsResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.post("/api/sale/create/", {
      product: productId,
      user: userId,
      price: price,
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", data: response.data }
  }

  /**
   * Inviting user to netwrok
   *
   * @param userEmail email of invited user
   */
  async inviteUserToNetwork(userEmail: string): Promise<GetFirmSingleProductsResult> {
    const token = await storage.load("@access_token")
    this.api.setHeaders({
      Authorization: `Bearer ${token}`,
    })
    const response: ApiResponse<any> = await this.api.post("/api/invite/", {
      email: userEmail,
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok", data: response.data }
  }
}
