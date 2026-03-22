import { useEffect, useRef } from 'react'
import { Flex, Heading, Card, Image, Link, Text, Grid } from '@chakra-ui/react'
import arrow from '@/assets/icons/arrow-right.svg'
import { useRecommendedStore } from '@/stores/recommendedStore.js'

function RecommendedBooks() {
  const books = useRecommendedStore(state => state.books)
  const getBooks = useRecommendedStore(state => state.getBooks)

  useEffect(() => {
    getBooks()
  }, [getBooks])

  const filteredBooks = books || []

  const countIndex = filteredBooks.length >= 3 ? 3 : filteredBooks.length

  const randomIndex = useRef(
    Math.floor(
      Math.random() *
        Math.max(1, filteredBooks.length - countIndex)
    )
  ).current

  // fixed poster size for mobile/tablet — increased so they fit better
  const posterW = 110
  const posterH = 155
  const colsBase = `repeat(${countIndex}, ${posterW}px)`
  const colsTablet = `repeat(${countIndex}, ${posterW}px)`
  const colsDesktop = `repeat(${countIndex}, minmax(${posterW}px, 1fr))`

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      mt="20px"
      p="5"
      h={{ base: '300px', tablet: '352px', desktop: '320px' }}
      w="100%"
      bg="brand.bgInput"
      rounded="12px"
    >
      <Heading fontFamily="Gilroy-Bold" fontSize="20px">
        Recommended books
      </Heading>

      {filteredBooks.length === 0 && (
        <Flex>Recommended books is empty</Flex>
      )}

      <Grid
        gap={{ base: '12px', tablet: '20px', desktop: '28px' }}
        gridTemplateColumns={{ base: colsBase, tablet: colsTablet, desktop: colsDesktop }}
        justifyContent="center"
        alignItems="start"
        overflowX="hidden"
      >
        {filteredBooks
          .slice(randomIndex, randomIndex + countIndex)
          .map((book) => (
            <Card.Root
              key={book._id || book.id}
              w="100%"
              maxW={{ base: `${posterW}px`, tablet: `${posterW}px`, desktop: '100%' }}
              border="none"
              overflow="hidden"
              bg="brand.bgInput"
            >
              {/* 🔥 RESİM + YAZI OVERLAY */}
              <Flex
                position="relative"
                direction="column"
                alignItems="center"
                justifyContent="center"
                p="2"
                h={`${posterH}px`}
                w={{ base: `${posterW}px`, tablet: `${posterW}px`, desktop: '100%' }}
                mx="auto"
                rounded="8px"
                overflow="hidden"
                boxShadow="0px 0px 16px 2px rgba(255,255,255,0.4) inset"
              >
                {/* 📸 IMAGE */}
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  position="absolute"
                  top="0"
                  left="0"
                  w={{ base: `${posterW}px`, tablet: `${posterW}px`, desktop: '100%' }}
                  h={`${posterH}px`}
                  objectFit="cover"
                  zIndex="0"
                />

                {/* 🌫️ DARK OVERLAY */}
                <Flex
                  position="absolute"
                  top="0"
                  left="0"
                  w={{ base: `${posterW}px`, tablet: `${posterW}px`, desktop: '100%' }}
                  h={`${posterH}px`}
                  bg="rgba(0,0,0,0.35)"
                  zIndex="1"
                />

                {/* 📝 TEXT (EN ÜSTTE) */}
                <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  zIndex="2"
                  h="100%"
                >
                  <Text
                    fontFamily="Gilroy-Medium"
                    fontSize="8px"
                    color="white"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {book.author}
                  </Text>

                  <Heading
                    fontFamily="Gilroy-Medium"
                    fontSize="8px"
                    lineHeight="10px"
                    color="white"
                    textAlign="center"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {book.title}
                  </Heading>
                </Flex>
              </Flex>

              {/* 📌 ALT YAZILAR (AYNEN KALIYOR) */}
              <Card.Body p="0" pt="1">
                <Card.Title
                  fontFamily="Gilroy-Bold"
                  fontSize="10px"
                  lineHeight="12px"
                  overflow="hidden"
                   color="white"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {book.title}
                </Card.Title>

                <Card.Description
                  fontFamily="Gilroy-Medium"
                  fontSize="10px"
                  lineHeight="12px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {book.author}
                </Card.Description>
              </Card.Body>
            </Card.Root>
          ))}
      </Grid>

      <Flex justifyContent="space-between">
        <Link
          href="/"
          color="brand.muted"
          fontFamily="Gilroy-Medium"
          fontSize="14px"
        >
          Home
        </Link>

        <Link href="/">
          <Image src={arrow} alt="arrow" h="24px" w="24px" />
        </Link>
      </Flex>
    </Flex>
  )
}

export default RecommendedBooks