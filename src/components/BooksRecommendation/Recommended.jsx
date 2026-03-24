import { useEffect, useMemo, useState } from 'react'
import {
  Flex,
  Heading,
  Grid,
  Text,
  Button,
  Box,
  useBreakpointValue
} from '@chakra-ui/react'

import { useRecommendedStore } from '@/stores/recommendedStore.js'
import BookItem from './BookItem'

function Recommended() {
  const [page, setPage] = useState(1)

  const getBooks = useRecommendedStore(state => state.getBooks)
  const books = useRecommendedStore(state => state.books)
  const isLoading = useRecommendedStore(state => state.isLoading)
  const error = useRecommendedStore(state => state.error)
  const title = useRecommendedStore(state => state.title)
  const author = useRecommendedStore(state => state.author)

  const pageSize = useBreakpointValue({
    base: 2,
    md: 8,
    lg: 12
  }) || 2
  const errorMessage =
    typeof error === 'string'
      ? error
      : error?.message || 'Unable to load recommended books'

  const safeBooks = Array.isArray(books) ? books : []

  const filteredBooks = useMemo(() => {
    return safeBooks.filter(book => {
      if (!book) return false

      const bookTitle = book.title?.toLowerCase() || ''
      const bookAuthor = book.author?.toLowerCase() || ''
      const inputTitle = title?.toLowerCase().trim() || ''
      const inputAuthor = author?.toLowerCase().trim() || ''

      if (!inputTitle && !inputAuthor) return true

      return (
        (!inputTitle || bookTitle.includes(inputTitle)) &&
        (!inputAuthor || bookAuthor.includes(inputAuthor))
      )
    })
  }, [safeBooks, title, author])

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize))

  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredBooks.slice(start, start + pageSize)
  }, [filteredBooks, page, pageSize])

  useEffect(() => {
    getBooks()
  }, [getBooks])

  useEffect(() => {
    setPage(1)
  }, [pageSize, title, author])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  return (
    <Flex direction="column" gap="5" w="full" overflow="hidden">
      <Flex justify="space-between" align="center" gap="4" wrap="wrap">
        <Heading
          fontFamily="Gilroy-Bold"
          fontSize={{ base: '20px', tablet: '28px' }}
        >
          Recommended
        </Heading>

        <Flex align="center" gap="2">
          <Button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            isDisabled={page === 1}
            h="34px"
            w="34px"
            borderRadius="full"
            bg="rgba(31, 31, 31, 1)"
            color="white"
            _hover={{ bg: 'rgba(50, 50, 50, 1)' }}
            _disabled={{
              bg: 'rgba(31, 31, 31, 0.5)',
              cursor: 'not-allowed'
            }}
          >
            ‹
          </Button>

          <Box
            px="4"
            py="1"
            borderRadius="full"
            bg="rgba(31, 31, 31, 1)"
            color="white"
          >
            <Text fontSize="sm" fontWeight="600">
              {page} / {totalPages}
            </Text>
          </Box>

          <Button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            isDisabled={page === totalPages}
            h="34px"
            w="34px"
            borderRadius="full"
            bg="rgba(31, 31, 31, 1)"
            color="white"
            _hover={{ bg: 'rgba(50, 50, 50, 1)' }}
            _disabled={{
              bg: 'rgba(31, 31, 31, 0.5)',
              cursor: 'not-allowed'
            }}
          >
            ›
          </Button>
        </Flex>
      </Flex>

      {isLoading && <Text>Loading...</Text>}

      {error && <Text color="red.400">{errorMessage}</Text>}

      {!isLoading && filteredBooks.length === 0 && (
        <Flex>Recommended books is empty</Flex>
      )}

      {paginatedBooks.length > 0 && (
        <Grid
          w="full"
          gapX={{ base: '12px', md: '25px', lg: '32px' }}
          gapY={{ base: '12px', md: '27px', lg: '36px' }}
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
            lg: 'repeat(6, minmax(0, 1fr))'
          }}
        >
          {paginatedBooks.map(book => (
            <BookItem key={book._id || book.id} book={book} />
          ))}
        </Grid>
      )}
    </Flex>
  )
}

export default Recommended
