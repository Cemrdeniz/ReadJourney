import { Box, Link, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router'

function WelcomePage() {
  return (
    <Box>
      <Text
        mb={{ base: '16px', tablet: '32px', desktop: '32px' }}
        w={{ base: '295px', tablet: '444px', desktop: '450px' }}
        fontSize={{ base: '16px', tablet: '20px', desktop: '28px' }}
      >
        Welcome to the app. You are welcome for choosing this app.
      </Text>
      <Link
        unstyled
        as={NavLink}
        to='login'
        px={{ base: '36px', tablet: '54px', desktop: '54px' }}
        py={{ base: '12px', tablet: '16px', desktop: '16px' }}
        fontFamily="Gilroy-Bold"
        fontSize={{ base: '14px', tablet: '20px', desktop: '20px' }}
        lineHeight={{ base: '14px', tablet: '20px', desktop: '20px' }}
        letterSpacing="0.02em"
        rounded="30px"
        color="brand.bgSecondary"
        bg="brand.accent"
      >
        Get started
      </Link>
    </Box>
  )
}

export default WelcomePage
