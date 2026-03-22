import { useEffect, useState } from 'react'
import { Flex, Heading, HStack, Grid, Text } from '@chakra-ui/react'

import {
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from '@/components/ui/pagination.jsx'

import { useRecommendedStore } from '@/stores/recommendedStore.js'
import useMediaQuery from '@/hooks/useMediaQuery.js'
import usePagination from '@/hooks/usePagination.js'

import BookItem from './BookItem'

function Recommended() {
  const [itemsLimit, setItemsLimit] = useState(2)

  const getBooks = useRecommendedStore(state => state.getBooks)
  const books = useRecommendedStore(state => state.books)
  const isLoading = useRecommendedStore(state => state.isLoading)
  const error = useRecommendedStore(state => state.error)

  const title = useRecommendedStore(state => state.title)
  const author = useRecommendedStore(state => state.author)

  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px)')
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  const safeBooks = Array.isArray(books) ? books : []

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage
  } = usePagination({
    contentPerPage: itemsLimit,
    count: safeBooks.length
  })

  // 📚 API CALL
  useEffect(() => {
    getBooks()
  }, [getBooks])

  // 📱 responsive
  useEffect(() => {
    if (isMobile) setItemsLimit(2)
    else if (isTablet) setItemsLimit(8)
    else if (isDesktop) setItemsLimit(10)
  }, [isMobile, isTablet, isDesktop])

  // 🔍 FILTER
 const filteredBooks = safeBooks.filter(book => {
  if (!book) return false

  const bookTitle = book.title?.toLowerCase() || ''
  const bookAuthor = book.author?.toLowerCase() || ''

  const inputTitle = title?.toLowerCase().trim() || ''
  const inputAuthor = author?.toLowerCase().trim() || ''

  // hiç filtre yoksa
  if (!inputTitle && !inputAuthor) return true

  return (
    (!inputTitle || bookTitle.includes(inputTitle)) &&
    (!inputAuthor || bookAuthor.includes(inputAuthor))
  )
})

  return (
    <Flex direction="column" gap="5" w="full" overflow="hidden">
      
      {/* HEADER */}
      <Flex justify="space-between">
        <Heading
          fontFamily="Gilroy-Bold"
          fontSize={{ base: '20px', tablet: '28px' }}
        >
          Recommended
        </Heading>

        <PaginationRoot
          count={filteredBooks.length}
          pageSize={itemsLimit}
          defaultPage={1}
        >
          <HStack gap="2">
            <PaginationPrevTrigger onClick={prevPage} />
            <PaginationNextTrigger onClick={nextPage} />
          </HStack>
        </PaginationRoot>
      </Flex>

      {/* LOADING */}
      {isLoading && <Text>Loading...</Text>}

      {/* ERROR */}
      {error && <Text color="red.400">{error}</Text>}

      {/* EMPTY STATE */}
      {!isLoading && filteredBooks.length === 0 && (
        <Flex>Recommended books is empty</Flex>
      )}

      {/* GRID */}
        <Grid
          w="full"
          gapX={{ base: '12px', tablet: '25px', desktop: '32px' }}
          gapY={{ base: '12px', tablet: '27px', desktop: '36px' }}
          gridTemplateColumns={{
            base: 'repeat(2, minmax(137px, 1fr))',
            tablet: 'repeat(auto-fill, minmax(137px, 1fr))',
            desktop: 'repeat(auto-fill, minmax(137px, 1fr))'
          }}
          justifyContent="start"
          justifyItems="start"
        >
        {filteredBooks
          .slice(firstContentIndex, lastContentIndex)
          .map(book => (
            <BookItem key={book._id || book.id} book={book} />
          ))}
      </Grid>
    </Flex>
  )
}

export default Recommended