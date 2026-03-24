import { Flex, Grid } from '@chakra-ui/react'
import Dashboard from '@/components/BooksLibrary/Dashboard'
import MyLibrary from '@/components/BooksLibrary/MyLibrary'

function MyLibraryPage() {
  return (
    <Grid
      templateColumns={{ desktopOnly: '480px 1fr', wideOnly: '480px 1fr' }}
      gap={{ base: '10px', tablet: '16px' }}
      bg="brand.bgPrimary"
      color="brand.accent"
    >
      <Flex
        direction={{ base: 'column', tablet: 'row', desktop: 'column' }}
        justifyContent={{
          base: 'normal',
          tablet: 'space-around',
          desktop: 'normal'
        }}
        p={{ base: '20px', tablet: '32px', desktop: '20px' }}
        pt={{ desktop: '40px' }}
        bg="brand.bgSecondary"
        rounded="30px"
      >
        <Dashboard />
      </Flex>
      <Flex
        direction="column"
        px={{ base: '20px', tablet: '40px' }}
        pt={{ base: '40px', tablet: '40px' }}
        pb='28px'
        h={{ base: '382px', tablet: '663px', desktop: '700px' }}
        bg="brand.bgSecondary"
        rounded="30px"
        overflow="hidden"
      >
        <MyLibrary />
      </Flex>
    </Grid>
  )
}

export default MyLibraryPage
