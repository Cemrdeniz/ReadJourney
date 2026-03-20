import { useState } from 'react'
import { IconButton, Image } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTrigger
} from '@/components/ui/drawer'
import menu from '@/assets/icons/menu.svg'
import UserNav from './UserNav'

function DrawerMenu() {
  const [open, setOpen] = useState(false)

  return (
    <DrawerRoot open={open} onOpenChange={e => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton variant="ghost" aria-label="menu">
          <Image src={menu} alt="menu" h="28px" w="28px" />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent pb="10" w="200px" bg="brand.bgInput" color="brand.accent">
        <DrawerBody display="flex" justifyContent="center" alignItems="center">
          <UserNav />
        </DrawerBody>
        <DrawerFooter justifyContent="center">
          <Button
            variant="outline"
            h="38px"
            w="91px"
            fontFamily="Gilroy-Bold"
            color="brand.accent"
            border="1px solid #f9f9f94d"
            rounded="30px"
            arial-label="button logout"
          >
            Log out
          </Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}

export default DrawerMenu
