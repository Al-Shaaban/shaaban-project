import type { User } from '~types/users'
import { restApiClient } from '~utils/clients/restApiClient'

export async function getMe() {
  try {
    const res = await restApiClient.url('/users/me').get<User>()
    return res
  } catch (error) {
    console.log('getMe', error)
  }
}
