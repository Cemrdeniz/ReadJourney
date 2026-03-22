import { Outlet } from 'react-router'
import { Grid, GridItem } from '@chakra-ui/react'
import Header from '@/components/Header.jsx'

function MainLayout() {
  return (
    <Grid
      grid={{
        base: `'header' 57px 'main' 1fr / 1fr`,
        tablet: `'header' 74px 'main' 1fr / 1fr`
      }}
      gap={{ base: '10px', tablet: '16px' }}
      p={{ base: '20px', tablet: '16px' }}
    >
      <Header />
      <GridItem gridArea="main">
        <Outlet />
      </GridItem>
    </Grid>
  )
}

export default MainLayout
