import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Flex, Heading, Text, Image } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import {
  startReadingApi,
  getReadingBookApi
} from '@/services/api'

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot
} from '@/components/ui/dialog'

import { useReadingStore } from '@/stores/readingStore'

function DialogBookStart({ book, onClose }) {
  const [open, setOpen] = useState(true)
  const [currentBook, setCurrentBook] = useState(book)

  const navigate = useNavigate()
  const setBook = useReadingStore(state => state.setBook)

  // 📌 API'DEN GÜNCEL BOOK ÇEK (STATUS İÇİN)
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getReadingBookApi(book._id)
        setCurrentBook(data)
      } catch (err) {
        console.log('FETCH ERROR:', err)
      }
    }

    fetchBook()
  }, [book._id])

  const imageSrc =
    currentBook?.imageUrl?.startsWith('http')
      ? currentBook.imageUrl
      : currentBook?.imageUrl
        ? `https://ftp.goit.study${currentBook.imageUrl}`
        : ''

  const status = currentBook?.status

  // 🚀 START / CONTINUE LOGIC
  const handleClick = async () => {
    try {
      // sadece hiç başlamadıysa start at
      if (!status || status === 'none') {
        const res = await startReadingApi({
          id: currentBook._id,
          page: 1
        })

        // store güncelle
        setBook({
          ...res,
          id: res._id
        })

        // state'i refresh et
        const updated = await getReadingBookApi(currentBook._id)
        setCurrentBook(updated)
      }

      onClose?.()

      navigate(`/reading/${currentBook._id}`)

    } catch (err) {
      console.error('ERROR:', err.response?.data || err.message)

      // 409 → zaten başlamış
      if (err.response?.status === 409) {
        onClose?.()
        navigate(`/reading/${currentBook._id}`)
      }
    }
  }

  return (
    <DialogRoot open={open} onOpenChange={e => setOpen(e.open)}>
      <DialogContent
        maxW={{ base: '320px', md: '420px' }}
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
                {currentBook?.title}
              </Heading>

              <Text fontSize="14px" color="gray.300" noOfLines={1}>
                {currentBook?.author}
              </Text>
            </Card.Body>

            {/* BUTTON */}
            <Card.Footer p="0" w="full">
              <Button
                onClick={handleClick}
                w="180px"
                mx="auto"
                borderRadius="999px"
                bg="green.400"
                color="black"
                _hover={{ bg: 'green.300' }}
              >
                {status === 'reading'
                  ? 'Continue reading'
                  : status === 'done'
                  ? 'Read again'
                  : 'Start reading'}
              </Button>
            </Card.Footer>

          </Card.Root>

        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default DialogBookStart