"use client"
import { useContext, useState, createContext } from "react"
import { TimeContext } from "@/types/index"

const TimeContext = createContext<TimeContext>({
  time: "long_tern",
  setTime: () => {},
})

export const useTime = () => {
  return useContext(TimeContext)
}

export const TimeProvider = ({ children }: any) => {
  const [time, setTime] = useState<string>("long_term")

  const value: TimeContext = {
    time,
    setTime,
  }

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>
}
