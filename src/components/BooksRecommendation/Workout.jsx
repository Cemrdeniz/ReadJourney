import {
  Flex, Link, Heading, Text, Mark, Center, Image
} from '@chakra-ui/react'
import arrow from '@/assets/icons/arrow-right.svg'

function Workout() {
  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      p="5"
      h={{ base: '244px', tablet: '272px' }}
      w="100%"
      bg="brand.bgInput"
      rounded="12px"
    >
      <Heading
        fontFamily="Gilroy-Bold"
        fontSize={{ base: '18px', tablet: '20px' }}
        lineHeight={{ base: '18px', tablet: '20px' }}
      >
        Start your workout
      </Heading>

      <Flex direction="column" gap="3">
        <Flex gap="3">
          <Center
            h={{ base: '40px', tablet: '44px' }}
            minW={{ base: '40px', tablet: '44px' }}
            fontFamily="Gilroy-Bold"
            fontSize={{ base: '18px', tablet: '20px' }}
            lineHeight={{ base: '18px', tablet: '20px' }}
            bg="brand.accent"
            color="brand.bgPrimary"
            rounded="50%"
          >
            1
          </Center>
          <Text
            fontFamily="Gilroy-Medium"
            fontSize="14px"
            lineHeight="18px"
            letterSpacing="0.02em"
            color="brand.muted"
          >
            <Mark pr="1" color="brand.accent">
              Create a personal library:
            </Mark>
            add the books you intend to read to it.
          </Text>
        </Flex>

        <Flex gap="3">
          <Center
            h={{ base: '40px', tablet: '44px' }}
            minW={{ base: '40px', tablet: '44px' }}
            fontFamily="Gilroy-Bold"
            fontSize={{ base: '18px', tablet: '20px' }}
            lineHeight={{ base: '18px', tablet: '20px' }}
            bg="brand.accent"
            color="brand.bgPrimary"
            rounded="50%"
          >
            2
          </Center>
          <Text
            fontFamily="Gilroy-Medium"
            fontSize="14px"
            lineHeight="18px"
            letterSpacing="0.02em"
            color="brand.muted"
          >
            <Mark pr="1" color="brand.accent">
              Create your first workout:
            </Mark>
            define a goal, choose a period, start training.
          </Text>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between">
        <Link
          href="/library"
          variant="underline"
          color="brand.muted"
          fontFamily="Gilroy-Medium"
          fontSize="14px"
          lineHeight="18px"
        >
          My library
        </Link>
        <Link
          href="/library"
          variant="plain"
          h="24px"
          minW="24px"
          aria-label="link to my library"
        >
          <Image src={arrow} alt="arrow" h="24px" w="24px" />
        </Link>
      </Flex>
    </Flex>
  )
}

export default Workout
