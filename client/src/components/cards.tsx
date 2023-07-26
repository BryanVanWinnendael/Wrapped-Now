import { Box, Image, Flex, useBreakpointValue } from "@chakra-ui/react"

interface CardType {
  imagesAndLinks: Array<[string, string]>
}

const Cards: React.FC<CardType> = ({ imagesAndLinks }) => {
  return (
    <Box marginY={5}>
      <Flex justifyContent="center">
        <Image
          borderRadius={8}
          h={useBreakpointValue({
            base: 40,
            lg: 60,
          })}
          w={useBreakpointValue({
            base: 40,
            lg: 60,
          })}
          src={imagesAndLinks[0][0]}
          alt="loading"
          cursor="pointer"
          _hover={{ transform: "scale(1.2)" }}
          transition="transform 0.2s ease-in-out"
          onClick={() => {
            window.open(imagesAndLinks[0][1])
          }}
        />
      </Flex>
      <Flex justifyContent="center">
        <Image
          marginTop={-5}
          borderRadius={8}
          h={useBreakpointValue({
            base: 40,
            lg: 60,
          })}
          w={useBreakpointValue({
            base: 40,
            lg: 60,
          })}
          src={imagesAndLinks[1][0]}
          alt="loading"
          cursor="pointer"
          _hover={{ transform: "scale(1.2)" }}
          transition="transform 0.2s ease-in-out"
          onClick={() => {
            window.open(imagesAndLinks[1][1])
          }}
        />
        <Image
          marginLeft={-5}
          borderRadius={8}
          h={useBreakpointValue({
            base: 40,
            lg: 60,
          })}
          w={useBreakpointValue({
            base: 40,
            lg: 60,
          })}
          src={imagesAndLinks[2][0]}
          alt="loading"
          cursor="pointer"
          _hover={{ transform: "scale(1.2)" }}
          transition="transform 0.2s ease-in-out"
          onClick={() => {
            window.open(imagesAndLinks[2][1])
          }}
        />
      </Flex>
    </Box>
  )
}

export default Cards
