import { useContext } from 'react'

import { AuthContext } from '~/lib/utils/contexts/auth'

export const useAuth = () => useContext(AuthContext)

export default useAuth
