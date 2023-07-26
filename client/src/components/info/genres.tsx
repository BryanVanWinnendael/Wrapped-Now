import { useAuth } from "@/contexts/auth"
import { useTime } from "@/contexts/time"
import { TopArtists } from "@/types"
import { fetcher } from "@/utils/fetcher"
import {
  Box,
  useToast,
  Text,
  Tag,
  useBreakpointValue,
  Flex,
  Spinner,
} from "@chakra-ui/react"
import Link from "next/link"
import { useState, useEffect } from "react"

const Genres = () => {
  const { token, setToken } = useAuth()
  const { time } = useTime()
  const toast = useToast()
  const id = "error-toast"

  const [genres, setGenres] = useState<Array<string> | null>()
  const [loading, setLoading] = useState<boolean>(true)
  const fontSize = useBreakpointValue({ base: "md", lg: "lg" })
  const paddingBox = useBreakpointValue({ base: 5, lg: 10 })

  const getTopGenres = async () => {
    if (!token) return
    setLoading(true)
    let response: TopArtists

    try {
      response = await fetcher(`artists/top?time_range=${time}`, "get", token)
    } catch (error) {
      return setLoading(false)
    }

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

  useEffect(() => {
    getTopGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, time])

  return (
    <Box paddingBottom={paddingBox}>
      <Text as="b" fontSize="4xl" color="white">
        Top genres
      </Text>
      <Flex flexDirection="column" gap={2} marginY={5}>
        {loading ? (
          <Spinner color="#22C55E" />
        ) : (
          <>
            <Flex gap={2}>
              {genres?.slice(0, 3).map((genre, index) => {
                return (
                  <Tag
                    w="fit-content"
                    bg="#171A20"
                    color="white"
                    fontSize={fontSize}
                    p={2}
                    key={index}
                  >
                    {genre}
                  </Tag>
                )
              })}
            </Flex>
            <Flex gap={2}>
              {genres?.slice(4, 6).map((genre, index) => {
                return (
                  <Tag
                    w="fit-content"
                    bg="#171A20"
                    color="white"
                    fontSize={fontSize}
                    p={2}
                    key={index}
                  >
                    {genre}
                  </Tag>
                )
              })}
            </Flex>
          </>
        )}
      </Flex>
      <Link className="linkAll" href="/genres">
        Show all genres
      </Link>
    </Box>
  )
}

export default Genres
