import { createContext, useContext, useState } from "react";

/*
 * @Author: KokoTa
 * @Date: 2021-06-30 17:08:57
 * @LastEditTime: 2021-06-30 18:18:00
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /react-test/src/pages/auth.js
 */
export const authContext = createContext()

export function useAuth() {
  return useContext(authContext)
}

export function useProvideAuth() {
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