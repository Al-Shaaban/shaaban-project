import { createContext, type PropsWithChildren } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { logout } from '~api/auth/logout'
import { getMe } from '~api/users/get-me'
import type { User } from '~types/users'
import type { Merge } from '~types/utils'

type AuthContextType = {
  user?: User
  isLoading: boolean
  setUser: (user: User) => void
  logout: () => void
  invalidateUser: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  setUser: () => {},
  logout: () => {},
  invalidateUser: () => {}
})

const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()

  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    refetchOnWindowFocus: false
  })

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess() {
      queryClient.setQueryData(['user'], undefined)
    }
  })

  const handleSetUser = (user?: User) => {
    queryClient.setQueryData(['user'], user)
  }

  const handleLogout = () => {
    logoutMutation()
  }

  if (isFetching) return 'loading'

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isFetching,
        setUser: handleSetUser,
        invalidateUser: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// type to be used in casting when we know the user is authenticated
export type AuthenticatedUser = Merge<
  AuthContextType,
  {
    user: User
    isLoading: false
  }
>

export default AuthProvider
