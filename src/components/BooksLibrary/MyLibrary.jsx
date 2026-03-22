import { useEffect, useState, useMemo } from 'react'
import {
  Flex,
  Heading,
  createListCollection,
  Grid,
  Button,
  Box,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '@/components/ui/select.jsx'

import BookZeroItem from './BookZeroItem'
import BookItem from './BookItem'
import { useLibraryStore } from '@/stores/libraryStore'

const filterList = createListCollection({
  items: [
    { label: 'Unread', value: 'unread' },
    { label: 'In progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
    { label: 'All books', value: 'all' }
  ]
})

function MyLibrary() {
  const books = useLibraryStore(state => state.books)
  const getBooks = useLibraryStore(state => state.getBooks)

  const [value, setValue] = useState(['all'])
  const [page, setPage] = useState(1)

  // ✅ MOBİLDE 2 KİTAP
  const pageSize = useBreakpointValue({
    base: 2,
    md: 8,
    lg: 10
  }) || 2

  const handleChange = e => {
    setValue(e.value)
    setPage(1)
  }

  const filteredBooks = useMemo(() => {
    return value[0] === 'all'
      ? books
      : books.filter(book => value[0] === book.status)
  }, [books, value])

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize))

  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredBooks.slice(start, start + pageSize)
  }, [filteredBooks, page, pageSize])

  useEffect(() => {
    setPage(1)
  }, [pageSize])

  useEffect(() => {
    getBooks()
  }, [getBooks])

  return (
    <Flex direction="column" gap="23px" w="full">
      {/* HEADER */}
      <Flex justify="space-between" align="center">
        <Heading fontSize="28px">My library</Heading>

        <Flex align="center" gap="3">
          <SelectRoot
            width="153px"
            collection={filterList}
            value={value}
            onValueChange={handleChange}
          >
            <SelectTrigger bg="brand.bgSecondary">
              <SelectValueText placeholder="All books" />
            </SelectTrigger>

            <SelectContent bg="brand.bgSecondary" color="brand.accent">
              {filterList.items.map(el => (
                <SelectItem key={el.value} item={el}>
                  {el.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          {/* PAGINATION */}
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

            {/* ✅ SADECE TABLET/DESKTOP */}
            <Box
              px="4"
              py="1"
              borderRadius="full"
              bg="rgba(31, 31, 31, 1)"
              color="white"
              display={{ base: 'none', md: 'block' }} // 🔥 kritik
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
      </Flex>

      {/* EMPTY */}
      {paginatedBooks.length === 0 && (
        <Flex justify="center" align="center" minH="200px">
          <BookZeroItem />
        </Flex>
      )}

      {/* GRID */}
      {paginatedBooks.length > 0 && (
        <Grid
          gapX={{ base: '12px', md: '25px', lg: '32px' }}
          gapY={{ base: '12px', md: '27px', lg: '36px' }}
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
            lg: 'repeat(5, minmax(0, 1fr))'
          }}
          w="full"
        >
          {paginatedBooks.map(book => (
            <BookItem key={book._id} book={book} />
          ))}
        </Grid>
      )}
    </Flex>
  )
}

export default MyLibrary
