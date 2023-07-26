import { useAuth } from "@/contexts/auth"
import { TopArtists } from "@/types"
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
import { useEffect, useState } from "react"
import Link from "next/link"
import { useTime } from "@/contexts/time"
import Cards from "../cards"

const Artists = () => {
  const { token, setToken } = useAuth()
  const { time } = useTime()
  const toast = useToast()
  const id = "error-toast"

  const [artists, setArtists] = useState<TopArtists | null>()
  const [loading, setLoading] = useState<boolean>(true)
  const rowStart = useBreakpointValue({
    base: 1,
    lg: 0,
  })

  const getTopArtists = async () => {
    if (!token) return
    setLoading(true)
    let response

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
    setArtists(response)
    setLoading(false)
  }

  useEffect(() => {
    getTopArtists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, time])

  return (
    <Box>
      <Text as="b" fontSize="4xl" color="white">
        Top artists
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
          ) : artists ? (
            artists.items.map((artist, index) => {
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
                  <ChakraLink isExternal href={artist.external_urls.spotify}>
                    <Image
                      borderRadius={8}
                      h="3rem"
                      w="3rem"
                      src={artist.images[0].url}
                      alt="loading"
                    />
                  </ChakraLink>
                  <ChakraLink
                    isExternal
                    href={artist.external_urls.spotify}
                    _hover={{ color: "#22C55E" }}
                  >
                    <Text
                      fontSize="lg"
                      as="b"
                      color="white"
                      _hover={{ color: "#22C55E" }}
                    >
                      {artist.name}
                    </Text>
                  </ChakraLink>
                </Flex>
              )
            })
          ) : (
            <></>
          )}

          <Link className="linkAll" href="/artists">
            Show all artists
          </Link>
        </Flex>
        {artists && (
          <GridItem rowStart={rowStart}>
            <Cards
              imagesAndLinks={[
                [
                  artists.items[0].images[0].url,
                  artists.items[0].external_urls.spotify,
                ],
                [
                  artists.items[1].images[0].url,
                  artists.items[1].external_urls.spotify,
                ],
                [
                  artists.items[2].images[0].url,
                  artists.items[2].external_urls.spotify,
                ],
              ]}
            />
          </GridItem>
        )}
      </Grid>
    </Box>
  )
}

export default Artists
