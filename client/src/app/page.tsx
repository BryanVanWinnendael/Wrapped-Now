"use client"
import { loginUrl } from "@/config/spotify"
import { useAuth } from "@/contexts/auth"
import {
  Button,
  Icon,
  Box,
  Text,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react"
import { SlSocialSpotify } from "react-icons/sl"
import Artists from "@/components/info/artists"
import Songs from "@/components/info/songs"
import Profile from "@/components/profile"
import { useTime } from "@/contexts/time"
import IconWrapped from "@/assets/wrappedIcon.png"
import Image from "next/image"
import Genres from "@/components/info/genres"

export default function Home() {
  const { token } = useAuth()
  const { time, setTime } = useTime()
  const paddingBox = useBreakpointValue({ base: 5, lg: 10 })
  const sizeText = useBreakpointValue({ base: "4xl", lg: "5xl" })

  const login = () => {
    location.href = loginUrl
  }

  const changeTime = (e: any) => {
    setTime(e.target.value)
  }

  return (
    <Box>
      {token ? (
        <div style={{ height: "100%" }}>
          <Profile />
          <Box padding={paddingBox} h="100%">
            <Select
              defaultValue={time}
              onChange={changeTime}
              w="fit-content"
              bg="#171A20"
              color="white"
              border="none"
              marginBottom={5}
            >
              <option className="selectChakra" value="long_term">
                All time
              </option>
              <option value="medium_term">6 Months</option>
              <option value="short_term">4 Weeks</option>
            </Select>
            <Genres />
            <Songs />
          </Box>
          <Box padding={paddingBox}>
            <Artists />
          </Box>
        </div>
      ) : (
        <Box
          h="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={5}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Image
                src={IconWrapped}
                alt="icon wrapped now"
                className="wrappedIcon"
              />
              <Text fontSize={sizeText} color="white" as="b">
                Wrapped Now
              </Text>
            </Box>

            <Text fontSize="lg" color="white">
              Login to spotify to get started
            </Text>
          </Box>

          <Button
            onClick={login}
            leftIcon={<Icon as={SlSocialSpotify} />}
            variant="solid"
            bg="#22C55E"
            _hover={{
              opacity: 0.7,
            }}
          >
            Login with spotify
          </Button>
        </Box>
      )}
    </Box>
  )
}
