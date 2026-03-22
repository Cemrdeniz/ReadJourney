import { Circle, Flex, Image, Mark, Text } from '@chakra-ui/react'
import booksIcon from '@/assets/icons/books.svg'

function BookZeroItem() {
  return (
    <Flex
      h={{ base: '164px', tablet: '186px' }}
      w={{ base: '197px', tablet: '274px' }}
      direction="column"
      align="center"
    >
      <Circle
        mb={{ base: '10px', tablet: '20px' }}
        size={{ base: '100px', tablet: '130px' }}
        bg="brand.bgInput"
      >
        <Image
          h={{ base: '50px', tablet: '70px' }}
          w={{ base: '50px', tablet: '70px' }}
          src={booksIcon}
          alt="image books"
        />
      </Circle>
      <Text
        fontFamily="Gilroy-Medium"
        fontSize="14px"
        lineHeight="18px"
        letterSpacing="-0.02em"
        color="brand.accent"
        textAlign="center"
      >
        To start training, add{' '}
        <Mark px="1" color="brand.muted">
          some of your books
        </Mark>
        or from the recommended ones
      </Text>
    </Flex>
  )
}

export default BookZeroItem
