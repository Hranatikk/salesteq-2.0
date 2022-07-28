import API from '../api'
import { GetFirmResult, GetFirmRProductsResult, GetSaleHistoryResult } from "./api.types"

export class FirmApi {
  async getFirm(): Promise<GetFirmResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/firm/my/`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NjM0NzM5LCJqdGkiOiJlZjM2M2Q0MTNmNDY0MmZlYWY1MmZhMjBmNmIwMjk1OCIsInVzZXJfaWQiOjJ9.ryNvgHmILb1I4-qkpBHX8hbf1y8ICkX0kMRG4TiYngI`
        },
        method: 'GET',
      })

      return { kind: "ok", data: response }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data", data: null }
    }
  }

  async getFirmProducts(): Promise<GetFirmRProductsResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/products/`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NjM0NzM5LCJqdGkiOiJlZjM2M2Q0MTNmNDY0MmZlYWY1MmZhMjBmNmIwMjk1OCIsInVzZXJfaWQiOjJ9.ryNvgHmILb1I4-qkpBHX8hbf1y8ICkX0kMRG4TiYngI`
        },
        method: 'GET',
      })

      return { kind: "ok", data: response }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data", data: null }
    }
  }

  async getUserSales(userId:number|string, withStructure:boolean): Promise<GetSaleHistoryResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/sale?${withStructure ? `for_user_id_with_structure` : `for_user_id`}=${userId}`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NjM0NzM5LCJqdGkiOiJlZjM2M2Q0MTNmNDY0MmZlYWY1MmZhMjBmNmIwMjk1OCIsInVzZXJfaWQiOjJ9.ryNvgHmILb1I4-qkpBHX8hbf1y8ICkX0kMRG4TiYngI`
        },
        method: 'GET',
      })

      return { kind: "ok", data: response }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", data: null }
    }
  }

  async getUserRevenues(userId:number|string, withStructure:boolean): Promise<GetSaleHistoryResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/revenue?${withStructure ? `for_user_id_with_structure` : `for_user_id`}=${userId}`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NjM0NzM5LCJqdGkiOiJlZjM2M2Q0MTNmNDY0MmZlYWY1MmZhMjBmNmIwMjk1OCIsInVzZXJfaWQiOjJ9.ryNvgHmILb1I4-qkpBHX8hbf1y8ICkX0kMRG4TiYngI`
        },
        method: 'GET',
      })

      return { kind: "ok", data: response }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", data: null }
    }
  }
}
