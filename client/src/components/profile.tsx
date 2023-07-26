import { useAuth } from "@/contexts/auth"
import { SpotifyProfile } from "@/types"
import { fetcher } from "@/utils/fetcher"
import {
  Avatar,
  Box,
  Flex,
  Link,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { SlSocialSpotify } from "react-icons/sl"
import { AiOutlineUser } from "react-icons/ai"
import Playback from "./playback"

const Profile = () => {
  const { token, setToken } = useAuth()
  const toast = useToast()
  const id = "error-toast"

  const [profile, setProfile] = useState<SpotifyProfile | null>(null)
  const sizeImage = useBreakpointValue({ base: "lg", lg: "xl" })

  const getProfile = async () => {
    if (!token) return
    const response = await fetcher("profile", "get", token)
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
    setProfile(response)
  }

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <Box
      bg="#171A20"
      padding={useBreakpointValue({ base: 5, lg: 10 })}
      margin={useBreakpointValue({ base: 2, lg: 10 })}
      borderRadius={8}
    >
      <Box
        display="flex"
        justifyContent={useBreakpointValue({
          base: "center",
          lg: "space-between",
        })}
      >
        <Box display="flex" alignItems="center" gap={5}>
          {profile?.images[0] ? (
            <Avatar
              border="4px"
              borderColor="white"
              src={profile?.images[0] ? profile?.images[0].url : AiOutlineUser}
              size={sizeImage}
            />
          ) : (
            <Avatar
              border="4px"
              borderColor="black"
              src="https://firebasestorage.googleapis.com/v0/b/portfolio-21d2a.appspot.com/o/profile.svg?alt=media&token=e65be889-eb06-4d84-9092-5e6f55542c78"
              size={sizeImage}
            />
          )}
          <Box display="flex" flexDirection="column">
            <Text fontSize="3xl" as="b" color="white">
              {profile?.display_name}
            </Text>
            <Text as="b" color="white">
              {profile?.followers.total} followers
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex
        flexDirection="column"
        alignItems={useBreakpointValue({
          base: "center",
          lg: "space-between",
        })}
      >
        <Link
          isExternal
          href={profile?.external_urls.spotify}
          color="white"
          display="flex"
          gap={2}
          marginTop={5}
          _hover={{ color: "#22C55E" }}
        >
          <SlSocialSpotify size={30} />
          Open in spotify
        </Link>
        <Box
          display="flex"
          justifyContent={useBreakpointValue({
            base: "flex-start",
            lg: "flex-end",
          })}
          marginBottom={useBreakpointValue({ base: 0, lg: -100 })}
          marginTop={5}
        >
          <Playback />
        </Box>
      </Flex>
    </Box>
  )
}

export default Profile
