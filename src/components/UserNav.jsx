import { Box, Flex, Link } from '@chakra-ui/react'
import { NavLink, useLocation } from 'react-router-dom'

function UserNav() {
  const { pathname } = useLocation()

  return (
    <Flex
      flexDirection={{ base: 'column', tablet: 'row' }}
      alignItems={{ base: 'center', tablet: 'center' }}
      justifyContent={{ base: 'center', tablet: 'flex-start' }}
      gap={{ base: '4px', tablet: '32px' }}
      w="100%"
    >
      <Link
        as={NavLink}
        to="/recommended"
        py="20px"
        w={{ base: '100%', tablet: 'auto' }}
        textAlign={{ base: 'center', tablet: 'left' }}
        display="block"
        fontFamily="Gilroy-Medium"
        fontSize={{ base: '14px', tablet: '16px' }}
        color={pathname === '/recommended' ? "brand.accent" : "brand.muted"}
        position="relative"
      >
        {pathname === '/recommended' && (
          <Box
            as="span"
            position="absolute"
            bottom="8px"
            left="50%"
            transform="translateX(-50%)"
            height="3px"
            width="40%"
            bg="brand.activeNavLink"
            borderRadius="8px"
          />
        )}
        Home
      </Link>

      <Link
        as={NavLink}
        to="/library"
        py="20px"
        w={{ base: '100%', tablet: 'auto' }}
        textAlign={{ base: 'center', tablet: 'left' }}
        display="block"
        fontFamily="Gilroy-Medium"
        fontSize={{ base: '14px', tablet: '16px' }}
        color={pathname === '/library' ? "brand.accent" : "brand.muted"}
        position="relative"
      >
        {pathname === '/library' && (
          <Box
            as="span"
            position="absolute"
            bottom="8px"
            left="50%"
            transform="translateX(-50%)"
            height="3px"
            width="40%"
            bg="brand.activeNavLink"
            borderRadius="8px"
          />
        )}
        My library
      </Link>
    </Flex>
  )
}

export default UserNav