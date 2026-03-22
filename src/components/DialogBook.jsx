import { useState, useMemo } from 'react'
import { Card, Flex, Heading, Text, Image } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot
} from '@/components/ui/dialog'

import { useLibraryStore } from '@/stores/libraryStore'

function DialogBook({ book }) {
  const [open, setOpen] = useState(true)

  const addRecommendedBook = useLibraryStore(
    state => state.addRecommendedBook
  )

  const books = useLibraryStore(state => state.books)
  const isLoading = useLibraryStore(state => state.isLoading)

  const isAdded = useMemo(() => {
    return books.some(
      b =>
        b._id === book._id ||
        (b.title === book.title && b.author === book.author)
    )
  }, [books, book])

  const handleClick = async () => {
    if (isAdded || isLoading) return
    await addRecommendedBook(book._id)
  }

  const imageSrc =
    book?.imageUrl?.startsWith('http')
      ? book.imageUrl
      : book?.imageUrl
        ? `https://ftp.goit.study${book.imageUrl}`
        : ''

  return (
    <DialogRoot open={open} onOpenChange={e => setOpen(e.open)}>
      <DialogContent
        maxW={{ base: '320px', md: '420px' }} // responsive
        bg="rgba(31, 31, 31, 1)"
        color="white"
        rounded="18px"
      >
        <DialogBody p="6">
          
          <Card.Root
            alignItems="center"
            textAlign="center"
            border="none"
            bg="rgba(31, 31, 31, 1)"
            maxW="100%"
          >
            
            {/* IMAGE */}
            <Flex
              w={{ base: '140px', md: '200px' }}
              h={{ base: '200px', md: '280px' }}
              justify="center"
              align="center"
              overflow="hidden"
              rounded="12px"
              mb="5"
            >
              <Image
                src={imageSrc}
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Flex>

            {/* TEXT */}
            <Card.Body
              p="0"
              mb="5"
              alignItems="center"
              gap="2"
              maxW="260px"
            >
              <Heading
                fontSize={{ base: '16px', md: '20px' }}
                color="white"
                noOfLines={2}
              >
                {book?.title}
              </Heading>

              <Text
                fontSize="14px"
                color="gray.300"
                noOfLines={1}
              >
                {book?.author}
              </Text>
            </Card.Body>

            {/* BUTTON */}
            <Card.Footer p="0" w="full">
              <Button
                onClick={handleClick}
                disabled={isAdded || isLoading}
                w="180px"
                mx="auto"
                borderRadius="999px"
                border="1px solid white"
                bg="transparent"
                color="white"
                _hover={{
                  bg: 'white',
                  color: 'black'
                }}
              >
                {isLoading
                  ? 'Adding...'
                  : isAdded
                    ? 'Already in library'
                    : 'Add to library'}
              </Button>
            </Card.Footer>

          </Card.Root>
        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default DialogBook