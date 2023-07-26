"use client"
import { useContext, useState, createContext, useEffect } from "react"
import { AuthContext, AuthObj } from "@/types/index"

const AuthContext = createContext<AuthContext>({
  token: null,
  setToken: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null)

  const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial: any, item: string) => {
        let parts = item.split("=")
        initial[parts[0]] = decodeURIComponent(parts[1])

        return initial
      }, {})
  }

  const value: AuthContext = {
    token,
    setToken,
  }

  useEffect(() => {
    const token: AuthObj = getTokenFromUrl()
    if (token.access_token) {
      setToken(token.access_token)
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
