import { Paths } from '~constants/paths'
import useAuth from '~hooks/use-auth'
import MainLayout from '~layouts/main-layout'
import type { Route } from '~types/routes'
import type { User } from '~types/users'
import { flat } from '~utils/functions/misc.functions'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import allPages from '~/routes'

const userHasPermission = (pathname: string, routes: Route[], user?: User) => {
  if (!user) return false

  const matched = routes.find((r) => r.path === pathname)
  return matched?.roles?.length ? matched.roles.includes(user.role) : true
}

interface Props {
  hasLayout?: boolean
}

const AuthGuard: React.FC<Props> = ({ hasLayout }) => {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const routes = flat(allPages)
  const hasPermission = userHasPermission(pathname, routes, user)

  return (
    <>
      {hasPermission ? (
        hasLayout ? (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ) : (
          <MainLayout>
            <Outlet />
          </MainLayout>
        )
      ) : (
        <Navigate replace to={Paths.AUTH_LOGIN_PAGE} state={{ from: pathname }} />
      )}
    </>
  )
}

export default AuthGuard
