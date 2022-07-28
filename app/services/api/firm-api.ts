import API from '../api'
import { GetFirmResult, GetSaleHistoryResult } from "./api.types"

export class FirmApi {
  async getFirm(): Promise<GetFirmResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/firm/my/`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NjE4MDU4LCJqdGkiOiI1NzY1NGY3YzhkN2E0YjRkYTVjMjFkYzljZmI0YWJkZCIsInVzZXJfaWQiOjJ9.n8awtkDzIbxLVozRFELJ_NLemEromHzgBsG7IdbQuJo`
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
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NTQwNjE5LCJqdGkiOiIzYmUxNTBmNGRkYzU0NDVjYWE5MjMxMDcxY2FlZjAxMCIsInVzZXJfaWQiOjJ9.Ja-OFfh7EMRB1egD-IHSj0rE4yy0divS0U8_P1AMS_o`
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
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NTQwNjE5LCJqdGkiOiIzYmUxNTBmNGRkYzU0NDVjYWE5MjMxMDcxY2FlZjAxMCIsInVzZXJfaWQiOjJ9.Ja-OFfh7EMRB1egD-IHSj0rE4yy0divS0U8_P1AMS_o`
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
