import NotFound from '~components/not-found'
import { Paths } from '~constants/paths'
import HomePage from '~pages/home'
import type { Route } from '~types/routes'
import AuthGuard from '~utils/guards/auth-guard'
import GuestGuard from '~utils/guards/guest-guard'

const routes: Route[] = [
  {
    element: <AuthGuard hasLayout />,
    children: []
  },
  {
    element: <GuestGuard />,
    children: [{ path: Paths.HOME_PAGE, element: <HomePage /> }]
  },
  { path: '*', element: <NotFound /> }
]

export default routes
