import API from '../api'
import { GetFirmResult } from "./api.types"

export class FirmApi {
  async getFirm(): Promise<GetFirmResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/firm/my/`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NjE4MDU4LCJqdGkiOiI1NzY1NGY3YzhkN2E0YjRkYTVjMjFkYzljZmI0YWJkZCIsInVzZXJfaWQiOjJ9.n8awtkDzIbxLVozRFELJ_NLemEromHzgBsG7IdbQuJo`
        },
        method: 'GET',
      })

      return { kind: "ok", firm: response }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
