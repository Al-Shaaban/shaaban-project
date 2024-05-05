import type { RouteObject } from 'react-router-dom'

import type { RoleEnum } from './enums'

type CustomRoute = { roles?: RoleEnum[] }

export type Route = RouteObject & CustomRoute
