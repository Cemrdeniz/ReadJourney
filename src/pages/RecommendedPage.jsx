import { Flex, Grid } from '@chakra-ui/react'
import Dashboard from '@/components/BooksRecommendation/Dashboard'
import Recommended from '@/components/BooksRecommendation/Recommended'

function RecommendedPage() {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        desktop: '353px 1fr',
        wide: '353px 1fr'
      }}
      gap={{ base: '10px', md: '16px' }}
      bg="brand.bgPrimary"
      color="brand.accent"
    >
      <Flex
        direction={{ base: 'column', md: 'row', lg: 'column' }}
        justifyContent={{
          base: 'normal',
          md: 'space-around',
          lg: 'normal'
        }}
        p={{ base: '20px', md: '32px', lg: '20px' }}
        pt={{ lg: '40px' }}
        bg="brand.bgSecondary"
        borderRadius="30px"
      >
        <Dashboard />
      </Flex>

      <Flex
        px={{ base: '20px', md: '40px' }}
        pt={{ base: '40px', md: '40px' }}
        pb="28px"
        height={{ base: 'auto', md: '663px', lg: '651px' }}
        bg="brand.bgSecondary"
        borderRadius="30px"
        overflowY="auto"
      >
        <Recommended />
      </Flex>
    </Grid>
  )
}

export default RecommendedPage