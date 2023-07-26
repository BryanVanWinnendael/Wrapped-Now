import { useAuth } from "@/contexts/auth"
import { CurrentlyPlaying } from "@/types"
import { fetcher } from "@/utils/fetcher"
import {
  Card,
  CardBody,
  Text,
  Box,
  Image,
  Link,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import PlayingIcon from "./playingIcon"

const Playback = () => {
  const { token, setToken } = useAuth()
  const toast = useToast()
  const id = "error-toast"

  const [currentPlayback, setCurrentPlayback] =
    useState<CurrentlyPlaying | null>(null)
  const sizeTextLarge = useBreakpointValue({ base: "lg", lg: "xl" })
  const sizeTextSmall = useBreakpointValue({ base: "sm", lg: "lg" })

  const getCurrentPlayback = async () => {
    if (!token) return
    let response

    try {
      response = await fetcher("songs/playing", "get", token)
    } catch (error) {
      return
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
      return setToken(null)
    }

    setCurrentPlayback(response)
  }

  const checkProgress = () => {
    const duration = currentPlayback?.item.duration_ms
    const progress = currentPlayback?.progress_ms

    if (!duration || !progress) return
    setTimeout(() => {
      getCurrentPlayback()
    }, duration - progress)
  }

  useEffect(() => {
    checkProgress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayback])

  useEffect(() => {
    getCurrentPlayback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <Card maxW="md" minW="xs" h="fit-content" bg="#22C55E">
      <CardBody display="flex" gap={10} justifyContent="space-between">
        {currentPlayback &&
        currentPlayback?.is_playing &&
        currentPlayback?.item ? (
          <>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              h="8rem"
            >
              <PlayingIcon />
              <Box display="flex" flexDirection="column" gap={2}>
                <Link
                  isExternal
                  href={currentPlayback?.item.external_urls.spotify}
                  color="white"
                >
                  <Text fontSize={sizeTextLarge} as="b">
                    {currentPlayback?.item.name}
                  </Text>
                </Link>
                <Link
                  isExternal
                  href={currentPlayback?.item.artists[0].external_urls.spotify}
                  fontSize="lg"
                >
                  <Text fontSize={sizeTextSmall} as="b">
                    {currentPlayback?.item.artists[0].name}
                  </Text>
                </Link>
              </Box>
            </Box>
            <Image
              borderRadius={8}
              h="8rem"
              w="8rem"
              src={
                currentPlayback?.item.album.images[0]
                  ? currentPlayback?.item.album.images[0].url
                  : "https://firebasestorage.googleapis.com/v0/b/portfolio-21d2a.appspot.com/o/icon.png?alt=media&token=6a7725c4-108f-43e6-9add-b329d92ff246"
              }
              alt="loading"
            />
          </>
        ) : (
          <Box display="flex" justifyContent="center">
            <Text fontSize="xl" as="b">
              No song is playing
            </Text>
          </Box>
        )}
      </CardBody>
    </Card>
  )
}

export default Playback
