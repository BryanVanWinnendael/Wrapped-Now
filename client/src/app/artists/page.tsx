"use client"
import { useAuth } from "@/contexts/auth"
import { useTime } from "@/contexts/time"
import { TopArtists } from "@/types"
import { fetcher } from "@/utils/fetcher"
import {
  Box,
  Text,
  Image,
  Link as ChakraLink,
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

  const [artists, setArtists] = useState<TopArtists | null>()
  const [loading, setLoading] = useState<boolean>(true)

  const getTopArtists = async () => {
    if (!token) return
    setLoading(true)
    const response = await fetcher(
      `artists/top?limit=50&time_range=${time}`,
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
    setArtists(response)
    setLoading(false)
  }

  const changeTime = (e: any) => {
    setTime(e.target.value)
  }

  useEffect(() => {
    getTopArtists()
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
        Top artists
      </Text>
      <Flex flexDirection="column">
        {loading ? (
          <Spinner color="#22C55E" />
        ) : (
          artists?.items.map((artist, index) => {
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
              </Box>
            )
          })
        )}
      </Flex>
    </Box>
  )
}

export default Page
