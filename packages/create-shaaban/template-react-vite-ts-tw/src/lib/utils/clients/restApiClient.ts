import { siteConfig } from '~constants/site-config'
import wretch from 'wretch'
import type { QueryStringAddon as WretchQueryStringAddon } from 'wretch/addons'
import QueryStringAddon from 'wretch/addons/queryString'

declare module 'wretch' {
  // all methods' url parameters are removed to enforce consistent usage of the url() method
  interface Wretch {
    post<TRes = unknown, TBody = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>,
      body?: TBody
      // url?: string | undefined
    ): Promise<TRes>
    get<TRes = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>
      // url?: string | undefined
    ): Promise<TRes>
    put<TRes = unknown, TBody = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>,
      body?: TBody
      // url?: string | undefined
    ): Promise<TRes>
    patch<TRes = unknown, TBody = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>,
      body?: TBody
      // url?: string | undefined
    ): Promise<TRes>
    delete<TRes = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>
      // url?: string | undefined
    ): Promise<TRes>
  }
}

export const rawRestApiClient = wretch(`${siteConfig.apiBaseUrl}`).addon(QueryStringAddon)

export const restApiClient = rawRestApiClient
  .options({ credentials: 'include' })
  .catcher(401, async () => {
    return await rawRestApiClient.url('/auth/refresh').post().res()
  })
  .resolve((res) => res.json())
