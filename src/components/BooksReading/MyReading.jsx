import { Flex, Heading, Image, Card, Text, Mark } from '@chakra-ui/react'
import unread from '@/assets/icons/block-run.svg'
import read from '@/assets/icons/block-stop.svg'
import { useReadingStore } from '@/stores/readingStore.js'
import DialogBookFinish from '@/components/DialogBookFinish.jsx'

function MyReading() {
  const book = useReadingStore(state => state.book)
  const isReading = useReadingStore(state => state.isReading)
  const imageSrc =
    book?.imageUrl?.startsWith('http')
      ? book.imageUrl
      : book?.imageUrl
        ? `https://readjourney.b.goit.study${book.imageUrl}`
        : ''

  if (!book) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Text>No book selected</Text>
      </Flex>
    )
  }

  return (
    <Flex direction="column" alignItems="center" w="full">
      <Flex
        justify="space-between"
        alignItems="center"
        mb={{ base: '40px', tablet: '32px', desktop: '44px' }}
        w="full"
      >
        <Heading
          fontFamily="Gilroy-Bold"
          fontSize={{ base: '20px', tablet: '28px' }}
        >
          My reading
        </Heading>

        {book?.status === 'done' && book?.timeLeftToRead && (
          <Text fontSize={{ base: '12px', tablet: '14px' }} color="brand.muted">
            {book.timeLeftToRead.days > 0 && (
              <>
                <Mark mx="2px">{book.timeLeftToRead.days}</Mark> days
              </>
            )}
            {book.timeLeftToRead.hours > 0 && (
              <>
                <Mark mx="2px">{book.timeLeftToRead.hours}</Mark> hours
              </>
            )}
            {book.timeLeftToRead.minutes > 0 && (
              <>
                <Mark mx="2px">{book.timeLeftToRead.minutes}</Mark> minutes left
              </>
            )}
          </Text>
        )}
      </Flex>

      <Card.Root
        alignItems="center"
        mb={{ base: '8px', tablet: '16px', desktop: '25px' }}
        maxW={{ base: '146px', tablet: '317px' }}
        bg="brand.bgSecondary"
        color="brand.accent"
        border="none"
        overflow="hidden"
      >
        <Flex
          position="relative"
          direction="column"
          alignItems="center"
          p="4"
          mb={{ base: '8px', tablet: '16px' }}
          h={{ base: '208px', tablet: '256px', desktop: '340px' }}
          w={{ base: '137px', tablet: '169px', desktop: '224px' }}
          rounded="8px"
          bg={book?.color || 'gray.500'}
          boxShadow="0px 0px 16px 2px rgba(255,255,255,0.4) inset"
          overflow="hidden"
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={book?.title}
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              objectFit="cover"
              zIndex="0"
            />
          )}

          <Flex
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="rgba(0,0,0,0.35)"
            zIndex="1"
          />

          <Text
            maxW="98%"
            mb="12"
            fontSize={{ base: '12px', tablet: '18px' }}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            zIndex="2"
            position="relative"
          >
            {book?.author}
          </Text>

          <Heading
            maxH="50%"
            fontSize={{ base: '10px', tablet: '14px' }}
            textAlign="center"
            overflow="hidden"
            textOverflow="ellipsis"
            zIndex="2"
            position="relative"
          >
            {book?.title}
          </Heading>
        </Flex>

        <Card.Body p="0">
          <Card.Title textAlign="center">
            {book?.title}
          </Card.Title>

          <Card.Description textAlign="center">
            {book?.author}
          </Card.Description>
        </Card.Body>
      </Card.Root>

      {!isReading ? (
        <Image mt="8px" src={read} h="50px" w="50px" alt="reading stopped" />
      ) : (
        <Image mt="8px" src={unread} h="50px" w="50px" alt="reading active" />
      )}

      <DialogBookFinish />
    </Flex>
  )
}

export default MyReading
