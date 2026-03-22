import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Flex, Grid } from '@chakra-ui/react'

import Dashboard from '@/components/BooksReading/Dashboard'
import MyReading from '@/components/BooksReading/MyReading'

import { getReadingBookApi } from '@/services/api'
import { useReadingStore } from '@/stores/readingStore'

function ReadingPage() {
  const { id } = useParams()

  const setBook = useReadingStore(state => state.setBook)

  // 📌 API'DEN BOOK ÇEK
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) return

        const data = await getReadingBookApi(id)

        // store sync
        setBook(data)

      } catch (err) {
        console.log('READING PAGE ERROR:', err)
      }
    }

    fetchBook()
  }, [id, setBook])

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        desktopOnly: '353px 1fr',
        wideOnly: '353px 1fr'
      }}
      gap={{ base: '10px', tablet: '16px' }}
      bg="brand.bgPrimary"
      color="brand.accent"
    >
      {/* LEFT */}
      <Flex
        direction="column"
        p="20px"
        bg="brand.bgSecondary"
        rounded="30px"
      >
        <Dashboard />
      </Flex>

      {/* RIGHT */}
      <Flex
        p="20px"
        bg="brand.bgSecondary"
        rounded="30px"
      >
        <MyReading />
      </Flex>
    </Grid>
  )
}

export default ReadingPage