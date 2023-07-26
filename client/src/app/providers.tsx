"use client"

import { AuthProvider } from "@/contexts/auth"
import { TimeProvider } from "@/contexts/time"
import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <TimeProvider>
          <AuthProvider>{children}</AuthProvider>
        </TimeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
