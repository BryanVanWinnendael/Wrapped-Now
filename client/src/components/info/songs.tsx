import { useAuth } from "@/contexts/auth"
import { useTime } from "@/contexts/time"
import { TopSongs } from "@/types"
import { fetcher } from "@/utils/fetcher"
import {
  Box,
  Text,
  Image,
  Link as ChakraLink,
  useToast,
  Flex,
  Spinner,
  Grid,
  useBreakpointValue,
  GridItem,
} from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Cards from "../cards"

const Songs = () => {
  const { token, setToken } = useAuth()
  const { time } = useTime()
  const toast = useToast()
  const id = "error-toast"

  const [songs, setSongs] = useState<TopSongs | null>()
  const [loading, setLoading] = useState<boolean>(true)
  const rowStart = useBreakpointValue({
    base: 1,
    lg: 0,
  })

  const getTopSongs = async () => {
    if (!token) return
    setLoading(true)
    let response

    try {
      response = await fetcher(`songs/top?time_range=${time}`, "get", token)
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
    setSongs(response)
    setLoading(false)
  }

  useEffect(() => {
    getTopSongs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, time])

  return (
    <Box>
      <Text as="b" fontSize="4xl" color="white">
        Top songs
      </Text>
      <Grid
        templateColumns={useBreakpointValue({
          base: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        })}
      >
        <Flex flexDirection="column">
          {loading ? (
            <Spinner color="#22C55E" />
          ) : songs ? (
            songs?.items.map((song, index) => {
              return (
                <Flex
                  key={index}
                  flexDirection="row"
                  alignItems="center"
                  gap={2}
                  marginTop={5}
                >
                  <Text fontSize="md" as="b" color="gray">
                    {index + 1}
                  </Text>
                  <Image
                    borderRadius={8}
                    h="3rem"
                    w="3rem"
                    src={song.album.images[0].url}
                    alt="loading"
                  />
                  <ChakraLink
                    isExternal
                    href={song.external_urls.spotify}
                    _hover={{ color: "#22C55E" }}
                  >
                    <Text
                      fontSize="lg"
                      as="b"
                      color="white"
                      _hover={{ color: "#22C55E" }}
                    >
                      {song.name}
                    </Text>
                  </ChakraLink>
                  <ChakraLink
                    isExternal
                    href={song.artists[0].external_urls.spotify}
                  >
                    <Text fontSize="md" as="b" color="#2e2e2e">
                      {song.artists[0].name}
                    </Text>
                  </ChakraLink>
                </Flex>
              )
            })
          ) : (
            <></>
          )}
          <Link className="linkAll" href="/songs">
            Show all songs
          </Link>
        </Flex>
        {songs && (
          <GridItem rowStart={rowStart}>
            <Cards
              imagesAndLinks={[
                [
                  songs.items[0].album.images[0].url,
                  songs.items[0].external_urls.spotify,
                ],
                [
                  songs.items[1].album.images[0].url,
                  songs.items[1].external_urls.spotify,
                ],
                [
                  songs.items[2].album.images[0].url,
                  songs.items[2].external_urls.spotify,
                ],
              ]}
            />
          </GridItem>
        )}
      </Grid>
    </Box>
  )
}

export default Songs
