import type { RoleEnum } from '../enums/roles'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: RoleEnum
  sub: string
}
