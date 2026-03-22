import { Outlet } from 'react-router'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Highlight,
  Image,
  Link
} from '@chakra-ui/react'
import imgPhone from '@/assets/images/iPhone 15 Black m.png'
import logo from '@/assets/icons/logo-mobile.svg'
import logoTablet from '@/assets/icons/logo-tablet.svg'

function AuthLayout() {
  return (
    <Grid
      templateRows={{
        base: 'repeat(2, 1fr)',
        tablet: 'repeat(1, 1fr)',
        desktop: '1fr',
        wide: '1fr'
      }}
      templateColumns={{
        desktopOnly: 'repeat(2, 1fr)',
        wideOnly: 'repeat(2, 1fr)'
      }}
      gap={{ base: '10px', tablet: '16px' }}
      p={{ base: '20px', tablet: '32px' }}
    >
      <Flex
        direction="column"
        justifyContent="flex-start"
        px={{ base: '5', tablet: '16', desktop: '64px' }}
        py={{ base: '5', tablet: '10', desktop: '40px' }}
        h={{ base: '411px', tablet: '960px', desktop: '736px' }}
        bg="brand.bgSecondary"
        borderRadius="30px"
      >
        <Box>
          <Link
            href="/"
            mb={{ base: '40px', tablet: '157px', desktop: '107px' }}
          >
            <Image hideFrom="tablet" src={logo} alt="logo" />
            <Image hideBelow="tablet" src={logoTablet} alt="logo" />
          </Link>
          <Heading
            as="h1"
            mb={{ base: '20px', tablet: '40px' }}
            w={{ base: '295px', tablet: '444px', desktop: '450px' }}
            fontFamily="Gilroy-Bold"
            fontSize={{ base: '32px', tablet: '64px' }}
            lineHeight={{ base: '32px', tablet: '60px' }}
            letterSpacing="0.02em"
          >
            <Highlight query="a book" styles={{ color: 'brand.bgFilter' }}>
              Expand your mind, reading a book
            </Highlight>
          </Heading>
        </Box>
        <Outlet />
      </Flex>
      <Flex
        justify="center"
        align="flex-start"
        p={{ base: '20px', tablet: '40px', desktop: '80px' }}
        h={{ base: '351px', tablet: '444px', desktop: '736px' }}
        overflow="hidden"
        bg="brand.bgSecondary"
        borderRadius="30px"
        hideFrom={{ tabletOnly: 'tablet', lgOnly: 'tablet', xlOnly: 'tablet' }}
      >
        <Image
          src={imgPhone}
          alt="image phone"
          maxW={{ base: '225px', tablet: '325px', desktop: '405px' }}
        />
      </Flex>
    </Grid>
  )
}

export default AuthLayout
