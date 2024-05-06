import { Paths } from '~constants/paths'
import HomePage from '~pages/home'
import type { Route } from '~types/routes'

const routes: Route[] = [
  {
    path: Paths.HOME_PAGE,
    element: <HomePage />
  },
  { path: '*', element: 'page not found' }
]

export default routes
