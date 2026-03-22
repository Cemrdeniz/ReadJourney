import { useState } from 'react'
import { Card, Flex, Heading, Text, Image, Box } from '@chakra-ui/react'
import DialogBook from '../DialogBook'

function BookItem({ book }) {
  const [openDialog, setOpenDialog] = useState(false)

  const toogleDialog = () => {
    setOpenDialog(!openDialog)
  }

  // ✅ IMAGE FIX — avoid concatenating null/undefined
  const imageSrc = book?.imageUrl
    ? (book.imageUrl.startsWith('http')
        ? book.imageUrl
        : `https://readjourney.b.goit.study${book.imageUrl}`)
    : ''

  return (
    <>
      <Card.Root
        w="100%"
        bg="brand.bgSecondary"
        color="brand.accent"
        border="none"
        overflow="hidden"
      >
        <Box
          position="relative"
          p="4"
          h="208px"
          w="137px"
          mx="auto"
          rounded="8px"
          boxShadow="0px 0px 16px 2px rgba(255,255,255,0.4) inset"
          cursor="pointer"
          onClick={toogleDialog}
          overflow="hidden"
        >
          {/* 🖼 FIXED-SIZE IMAGE BOX */}
          <Image
            src={imageSrc}
            alt={book.title}
            position="absolute"
            top="0"
            left="0"
            w="137px"
            h="208px"
            objectFit="cover"
            zIndex="0"
          />

          {/* 🔲 DARK OVERLAY (yazı okunur olsun diye) */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="137px"
            h="208px"
            bg="rgba(0,0,0,0.4)"
            zIndex="1"
          />

          {/* ✏️ TEXT (üstte) */}
          <Flex
            direction="column"
            alignItems="center"
            zIndex="2"
            h="100%"
            justifyContent="center"
          >
            <Text
              mb="12"
              maxW="98%"
              fontFamily="Gilroy-Medium"
              fontSize="10px"
              lineHeight="12px"
              letterSpacing="0.02em"
              overflow="hidden"
              textWrap="nowrap"
              textOverflow="ellipsis"
              userSelect="none"
            >
              {book.author}
            </Text>

            <Heading
              maxH="50%"
              fontFamily="Gilroy-Bold"
              fontSize="14px"
              lineHeight="18px"
              letterSpacing="-0.02em"
              overflow="hidden"
              textOverflow="ellipsis"
              textAlign="center"
              userSelect="none"
            >
              {book.title}
            </Heading>
          </Flex>
        </Box>
        

        {/* ALT KISIM AYNI KALDI */}
        <Card.Body p="0" pt="2" w="100%">
          <Card.Title
            fontFamily="Gilroy-Bold"
            fontSize="14px"
            lineHeight="18px"
            letterSpacing="0.02em"
            overflow="hidden"
            textWrap="nowrap"
            textOverflow="ellipsis"
            userSelect="none"
          >
            {book.title}
          </Card.Title>

          <Card.Description
            fontFamily="Gilroy-Medium"
            fontSize="10px"
            lineHeight="12px"
            letterSpacing="0.02em"
            overflow="hidden"
            textWrap="nowrap"
            textOverflow="ellipsis"
          >
            {book.author}
          </Card.Description>
        </Card.Body>
      </Card.Root>

      {openDialog && <DialogBook statBook={true} book={book} />}
    </>
  )
}

export default BookItem