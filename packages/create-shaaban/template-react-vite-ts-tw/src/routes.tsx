import { Paths } from '@constants/paths'
import type { Route } from '@type/routes'

import HomePage from './pages/home'

const routes: Route[] = [
  {
    path: Paths.HOME_PAGE,
    element: <HomePage />
  },
  { path: '*', element: 'page not found' }
]

export default routes
