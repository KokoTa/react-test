import { createContext, useContext, useState } from 'react'

export const authContext = createContext()

export function useAuth () {
  return useContext(authContext)
}

export function useProvideAuth () {
  const [user, setUser] = useState(null)
  const signIn = (cb) => {
    setUser('user')
    cb && cb()
  }
  const signOut = (cb) => {
    setUser(null)
    cb && cb()
  }

  return {
    user,
    signIn,
    signOut
  }
}
