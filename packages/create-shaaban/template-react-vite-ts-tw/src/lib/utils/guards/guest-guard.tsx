import { Paths } from '~constants/paths'
import useAuth from '~hooks/use-auth'
import MainLayout from '~layouts/main-layout'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const GuestGuard = () => {
  const { user } = useAuth()
  const { pathname } = useLocation()

  return (
    <>
      {!user ? (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ) : (
        <Navigate replace to={Paths.HOME_PAGE} state={{ from: pathname }} />
      )}
    </>
  )
}

export default GuestGuard
