import { Flex, Image, Mark, Text } from '@chakra-ui/react'
import books from '@/assets/icons/books.svg'

function Expression(props) {
  return (
    <Flex
      align="center"
      mt="20px"
      px="20px"
      py="15px"
      gap="14px"
      h="83px"
      w="313px"
      rounded="12px"
      bg="brand.bgInput"
      hideBelow="desktop"
      {...props}
    >
      <Image h="40px" w="40px" src={books} alt="image books" />
      <Text
        fontFamily="Gilroy-Medium"
        fontSize="14px"
        lineHeight="18px"
        letterSpacing="0.02em"
        color="brand.muted"
      >
        &quot;Books are
        <Mark px="1" color="brand.accent">
          windows
        </Mark>
        to the world, and reading is a journey into the unknown.&quot;
      </Text>
    </Flex>
  )
}

export default Expression
