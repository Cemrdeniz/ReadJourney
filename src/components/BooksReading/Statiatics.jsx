import { Box, Flex, Heading, HStack, Mark, Text } from '@chakra-ui/react'
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText
} from '@/components/ui/progress-circle.jsx'
import { useReadingStore } from '@/stores/readingStore.js'
import { useEffect, useState } from 'react'

function Statiatics() {
  const book = useReadingStore(state => state.book)
  const [total, setTotal] = useState({ pages: 0, procent: 0 })
  const rawProgress = book?.progress
  const safeProgress = Array.isArray(rawProgress) ? rawProgress : []
  const totalPages = book?.totalPages || 0

  const totalReading = (arr) => {
    const completed = arr.filter(el =>
      el?.startPage != null &&
      el?.finishPage != null
    )

    if (!completed.length || !totalPages) {
      setTotal({ pages: 0, procent: 0 })
      return
    }

    const pages = completed.reduce((acc, cur) => {
      return acc + (cur.finishPage - cur.startPage)
    }, 0)
    const procent = Math.floor((pages / totalPages) * 100)
    return setTotal({ pages, procent })
  }

  useEffect(() => {
    totalReading(safeProgress)
  }, [rawProgress])

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="6"
      p="4"
      h={{ base: '211px', tablet: '252px', desktop: '281px' }}
      w={{ base: '295px', tablet: '321px', desktop: '313px' }}
      rounded="12px"
      bg="brand.bgInput"
    >
      <HStack w="75px">
        <ProgressCircleRoot size="xl" value={total.procent} colorPalette="green">
          <ProgressCircleRing cap="round" />
          <ProgressCircleValueText />
        </ProgressCircleRoot>
      </HStack>

      <Flex w={{ base: '90px', tablet: '108px' }} gap="2">
        <Box h="3.5" w="3.5" bg="brand.success" rounded="4px" />
        <Flex direction="column" gap="1.5">
          <Heading
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '14px', tablet: '20px' }}
            lineHeight={{ base: '18px', tablet: '20px' }}
            letterSpacing="0.02em"
          >
            {total.procent}%
          </Heading>
          <Text
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '10px', tablet: '12px' }}
            lineHeight={{ base: '12px', tablet: '14px' }}
            color="brand.muted"
          >
            {total.pages}
            <Mark ml="2px">pages read</Mark>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Statiatics
