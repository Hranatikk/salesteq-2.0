import { ApiResponse, create } from "apisauce"
// import { Api } from "./api"
import API from '../api'
import { GetCharactersResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class CharacterApi {
  // private api: Api

  // constructor(api: Api) {
  //   this.api = api
  // }

  async getCharacters(): Promise<GetCharactersResult> {
    try {
      const response = await API.callAPI('http://46.22.223.113/api/user/me/', {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NDc2MzM4LCJqdGkiOiIwM2Q2ZTEyOTM4MGE0ZTdkYjczNGRiZTc5Njg5ZTY2NyIsInVzZXJfaWQiOjJ9.qJdnCXVjW7TYKpsQuyQalVed8vbb9IHorYrCY9j_g8g`
        },
        method: 'GET',
      })
      console.log(response)
      // make the api call
      // const api = create({
      //   baseURL: 'http://46.22.223.113',
      //   headers: {
      //     'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NDc2MzM4LCJqdGkiOiIwM2Q2ZTEyOTM4MGE0ZTdkYjczNGRiZTc5Njg5ZTY2NyIsInVzZXJfaWQiOjJ9.qJdnCXVjW7TYKpsQuyQalVed8vbb9IHorYrCY9j_g8g`
      //   },
      // })

      // const response: ApiResponse<any> = await api.get(
      //   "/api/user/me",
      // )
      //   console.log(response)
      // // the typical ways to die when calling an api
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response)
      //   if (problem) return problem
      // }

      // const characters = response.data.results

      return { kind: "ok", characters: response }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
