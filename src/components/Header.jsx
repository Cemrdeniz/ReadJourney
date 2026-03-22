import { useEffect } from 'react'
import { Button, Flex, Image, Link, Text } from '@chakra-ui/react'
import logo from '@/assets/icons/logo-mobile.svg'
import { Avatar } from './ui/avatar'
import DrawerMenu from './DrawerMenu'
import UserNav from './UserNav'
import { useAuthStore } from '@/stores/authStore'

function Header() {
  const name = useAuthStore((state) => state.name)
  const currentUser = useAuthStore((state) => state.currentUser)
  const signoutUser = useAuthStore((state) => state.signoutUser)

  // 🔥 sayfa açılınca user çek
  useEffect(() => {
    currentUser()
  }, [currentUser])

  return (
    <Flex
      gridArea="header"
      alignItems="center"
      justifyContent="space-between"
      px={{ base: '20px', tablet: '16px' }}
      bg="brand.bgSecondary"
      color="brand.accent"
      borderRadius="15px"
    >
      {/* LOGO */}
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>

      <Flex alignItems="center" h="full">
        
        {/* ✅ TABLET + DESKTOP MENÜ */}
        <Flex hideBelow="tablet">
          <UserNav />
        </Flex>

        {/* AVATAR */}
        <Avatar
          size="md"
          mr={{ base: '8px', tablet: '16px' }}
          ml={{ base: '0', tablet: '94px', desktop: '219px' }}
          fontFamily="Gilroy-Bold"
          color="brand.accent"
          bg="brand.bgSecondary"
          border="1px solid #f9f9f94d"
          name={name || 'User'}
        />

        {/* NAME */}
        <Text
          mr={{ desktop: '16px' }}
          fontFamily="Gilroy-Bold"
          fontSize={{ desktop: '16px' }}
          lineHeight={{ desktop: '18px' }}
          color="brand.accent"
          hideBelow="desktop"
        >
          {name || 'User'}
        </Text>

        {/* LOGOUT */}
        <Button
          variant="outline"
          h="38px"
          w="91px"
          fontFamily="Gilroy-Bold"
          color="brand.accent"
          border="1px solid #f9f9f94d"
          rounded="30px"
          aria-label="logout button"
          hideBelow="tablet"
          onClick={signoutUser}
          _hover={{
            bg: 'transparent',
            color: 'brand.accent'
          }}
        >
          Log out
        </Button>

        {/* 🔥 SADECE MOBİL HAMBURGER */}
        <Flex hideFrom="tablet">
          <DrawerMenu />
        </Flex>

      </Flex>
    </Flex>
  )
}

export default Header