// import { ApiResponse, create } from "apisauce"
// import { Api } from "./api"
// import { getGeneralApiProblem } from "./api-problem"
import API from '../api'
import { GetProfileResult, GetProfileConnectionsResult, GetProfileStatsOnlyResult } from "./api.types"

export class ProfileApi {
  // private api: Api

  // constructor(api: Api) {
  //   this.api = api
  // }

  async getProfile(): Promise<GetProfileResult> {
    try {
      const response = await API.callAPI('http://46.22.223.113/api/user/me/', {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NTQwNjE5LCJqdGkiOiIzYmUxNTBmNGRkYzU0NDVjYWE5MjMxMDcxY2FlZjAxMCIsInVzZXJfaWQiOjJ9.Ja-OFfh7EMRB1egD-IHSj0rE4yy0divS0U8_P1AMS_o`
        },
        method: 'GET',
      })

      // make the api call
      // const api = create({
      //   baseURL: 'http://46.22.223.113',
      //   headers: {
      //     'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NTQwNjE5LCJqdGkiOiIzYmUxNTBmNGRkYzU0NDVjYWE5MjMxMDcxY2FlZjAxMCIsInVzZXJfaWQiOjJ9.Ja-OFfh7EMRB1egD-IHSj0rE4yy0divS0U8_P1AMS_o`
      //   },
      // })

      // const response: ApiResponse<any> = await api.get(
      //   "/api/user/me",
      // )
      // // the typical ways to die when calling an api
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }

      // const characters = response.data.results

      return { kind: "ok", profile: response }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getProfileStats(userId:number|string): Promise<GetProfileStatsOnlyResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/user/${userId}/stats/`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NTQwNjE5LCJqdGkiOiIzYmUxNTBmNGRkYzU0NDVjYWE5MjMxMDcxY2FlZjAxMCIsInVzZXJfaWQiOjJ9.Ja-OFfh7EMRB1egD-IHSj0rE4yy0divS0U8_P1AMS_o`
        },
        method: 'GET',
      })

      return { kind: "ok", profileStats: response.stats }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getProfileConnections(): Promise<GetProfileConnectionsResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/my/users/`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NTQwNjE5LCJqdGkiOiIzYmUxNTBmNGRkYzU0NDVjYWE5MjMxMDcxY2FlZjAxMCIsInVzZXJfaWQiOjJ9.Ja-OFfh7EMRB1egD-IHSj0rE4yy0divS0U8_P1AMS_o`
        },
        method: 'GET',
      })

      return { kind: "ok", connections: response }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getProfileConnectionsByUserId(userId:number|string): Promise<GetProfileConnectionsResult> {
    try {
      const response = await API.callAPI(`http://46.22.223.113/api/supervisor/${userId}/users`, {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NTQwNjE5LCJqdGkiOiIzYmUxNTBmNGRkYzU0NDVjYWE5MjMxMDcxY2FlZjAxMCIsInVzZXJfaWQiOjJ9.Ja-OFfh7EMRB1egD-IHSj0rE4yy0divS0U8_P1AMS_o`
        },
        method: 'GET',
      })

      return { kind: "ok", connections: response }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
