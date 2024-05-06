import { restApiClient } from '~utils/clients/restApiClient'

export async function logout() {
  try {
    await restApiClient.url('/auth/logout').post<void>()
  } catch (error) {
    console.log('logout', error)
  }
}
