"use client"
import { useAuth } from "@/contexts/auth"
import { useTime } from "@/contexts/time"
import { TopArtists } from "@/types"
import { fetcher } from "@/utils/fetcher"
import {
  Box,
  Text,
  Select,
  useBreakpointValue,
  useToast,
  Flex,
  Spinner,
} from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoChevronBack } from "react-icons/io5"

const Page = () => {
  const { token, setToken } = useAuth()
  const { time, setTime } = useTime()
  const toast = useToast()
  const id = "error-toast"

  const [genres, setGenres] = useState<Array<string> | null>()
  const [loading, setLoading] = useState<boolean>(true)

  const getTopGenres = async () => {
    if (!token) return
    setLoading(true)
    const response: TopArtists = await fetcher(
      `artists/top?time_range=${time}`,
      "get",
      token
    )
    if (response.error) {
      if (!toast.isActive(id)) {
        toast({
          id,
          title: "Session expired",
          description: "Please login again",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
      setLoading(false)
      return setToken(null)
    }
    const genreMap = new Map<string, number>()

    response.items.forEach((artist) => {
      artist.genres.forEach((genre) => {
        if (genreMap.has(genre)) {
          genreMap.set(genre, genreMap.get(genre)! + 1)
        } else {
          genreMap.set(genre, 1)
        }
      })
    })
    const entries = genreMap.entries()
    const resultArray: [string, number][] = Array.from(entries)
    const sortedGenreMap = new Map([...resultArray].sort((a, b) => b[1] - a[1]))
    const keys = sortedGenreMap.keys()
    const resultKeys: string[] = Array.from(keys)
    const keysArray: string[] = [...resultKeys]

    setGenres(keysArray)
    setLoading(false)
  }

  const changeTime = (e: any) => {
    setTime(e.target.value)
  }

  useEffect(() => {
    getTopGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, time])

  return (
    <Box padding={useBreakpointValue({ base: 5, lg: 10 })}>
      <Link href="/" color="white" className="linkNext">
        <IoChevronBack size={30} />
        Back
      </Link>
      <Select
        defaultValue={time}
        onChange={changeTime}
        w="fit-content"
        bg="#171A20"
        color="white"
        border="none"
        marginBottom={5}
      >
        <option value="long_term">All time</option>
        <option value="medium_term">6 Months</option>
        <option value="short_term">4 Weeks</option>
      </Select>
      <Text as="b" fontSize="4xl" color="white">
        Top genres
      </Text>
      <Flex flexDirection="column">
        {loading ? (
          <Spinner color="#22C55E" />
        ) : (
          genres?.map((genre, index) => {
            return (
              <Box
                key={index}
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
                marginTop={5}
              >
                <Text fontSize="md" as="b" color="gray">
                  {index + 1}
                </Text>

                <Text fontSize="lg" as="b" color="white">
                  {genre}
                </Text>
              </Box>
            )
          })
        )}
      </Flex>
    </Box>
  )
}

export default Page
