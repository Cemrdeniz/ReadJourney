import { useState } from 'react'
import {
  Card,
  Flex,
  Heading,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react'

import trash from '@/assets/icons/trash.svg'
import DialogBookStart from '@/components/DialogBookStart.jsx'
import { useLibraryStore } from '@/stores/libraryStore.js'

function BookItem({ book }) {
  const [openDialog, setOpenDialog] = useState(false)

  const removeBook = useLibraryStore(state => state.removeBook)

  const toggleDialog = () => {
    setOpenDialog(!openDialog)
  }

  // 🔥 IMAGE FIX — avoid concatenating null/undefined
  const imageSrc = book?.imageUrl
    ? (book.imageUrl.startsWith('http')
        ? book.imageUrl
        : `https://readjourney.b.goit.study${book.imageUrl}`)
    : ''

  return (
    <>
      <Flex direction="column">
        <Card.Root
          maxW="137px"
          bg="brand.bgSecondary"
          color="brand.accent"
          border="none"
          overflow="hidden"
        >
          {/* 📦 IMAGE AREA */}
          <Flex
            position="relative"
            direction="column"
            alignItems="center"
            p="4"
            h="208px"
            w="137px"
            rounded="8px"
            boxShadow="0px 0px 16px 2px rgba(255,255,255,0.4) inset"
            cursor="pointer"
            onClick={toggleDialog}
            overflow="hidden"
          >
            {/* 🖼 IMAGE */}
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
            {/* 🔲 OVERLAY */}
            <Flex
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bg="rgba(0,0,0,0.4)"
              zIndex="1"
            />

            {/* ✏️ TEXT */}
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              h="100%"
              zIndex="2"
            >
              <Text
                mb="8"
                maxW="98%"
                fontFamily="Gilroy-Medium"
                fontSize="9px"
                lineHeight="11px"
                noOfLines={1}
                userSelect="none"
              >
                {book?.author}
              </Text>

              <Heading
                maxW="100%"
                fontFamily="Gilroy-Bold"
                fontSize="12px"
                lineHeight="14px"
                noOfLines={1}
                userSelect="none"
                textAlign="center"
              >
                {book?.title}
              </Heading>
            </Flex>
          </Flex>

          {/* 📌 ALT KISIM */}
          <Card.Body p="0" mt="2">
            <Flex align="center" justify="space-between" w="100%">
              
              {/* SOL TARAF */}
              <Flex direction="column" minW="0" flex="1">
                <Text
                  fontSize="13px"
                  lineHeight="16px"
                  fontFamily="Gilroy-Bold"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {book?.title}
                </Text>

                <Text
                  fontSize="9px"
                  lineHeight="12px"
                  fontFamily="Gilroy-Medium"
                  noOfLines={1}
                >
                  {book?.author}
                </Text>
              </Flex>

              {/* SAĞ TARAF (TRASH) */}
              <IconButton
                minW="28px"
                h="28px"
                aria-label="delete book"
                bg="#E850501d"
                border="1px solid #E850502d"
                rounded="full"
                flexShrink={0}
                onClick={() => removeBook(book._id)}  // ✅ DOĞRU
              >
                <Image src={trash} alt="delete book" />
              </IconButton>

            </Flex>
          </Card.Body>
        </Card.Root>
      </Flex>

      {/* DIALOG */}
      {openDialog && (
        <DialogBookStart
          statBook={false}
          onClose={toggleDialog}
          book={book}
        />
      )}
    </>
  )
}

export default BookItem