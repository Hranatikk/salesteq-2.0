import API from '../api'
import { GetFirmResult, GetFirmRProductsResult, GetSaleHistoryResult } from "./api.types"

export class FirmApi {
  async getFirm(): Promise<GetFirmResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/firm/my/`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMjQ4NTkwLCJqdGkiOiJkMWRkODA3YWUzNjY0NGIyYmJhYTc2YzUyOWY0YTJjOSIsInVzZXJfaWQiOjJ9.tBiHy3drWoXtWoEDUlnKsRCWQbOADQZL8ANl4rik_70`
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
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMjQ4NTkwLCJqdGkiOiJkMWRkODA3YWUzNjY0NGIyYmJhYTc2YzUyOWY0YTJjOSIsInVzZXJfaWQiOjJ9.tBiHy3drWoXtWoEDUlnKsRCWQbOADQZL8ANl4rik_70`
        },
        method: 'GET',
      })

      return { kind: "ok", data: response }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data", data: e.message }
    }
  }

  async getUserSales(userId:number|string, withStructure:boolean): Promise<GetSaleHistoryResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/sale?${withStructure ? `for_user_id_with_structure` : `for_user_id`}=${userId}`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMjQ4NTkwLCJqdGkiOiJkMWRkODA3YWUzNjY0NGIyYmJhYTc2YzUyOWY0YTJjOSIsInVzZXJfaWQiOjJ9.tBiHy3drWoXtWoEDUlnKsRCWQbOADQZL8ANl4rik_70`
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
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMjQ4NTkwLCJqdGkiOiJkMWRkODA3YWUzNjY0NGIyYmJhYTc2YzUyOWY0YTJjOSIsInVzZXJfaWQiOjJ9.tBiHy3drWoXtWoEDUlnKsRCWQbOADQZL8ANl4rik_70`
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
