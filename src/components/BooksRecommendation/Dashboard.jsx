import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Button,
  Input,
  InputElement,
  Stack,
  Flex,
  Heading,
  Box
} from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import Workout from './Workout'
import Expression from './Expression'
import { useRecommendedStore } from '@/stores/recommendedStore.js'

const schemaRec = yup.object({
  title: yup.string().notRequired(),
  author: yup.string().notRequired()
})

function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schemaRec) })
  const setTitle = useRecommendedStore(state => state.setTitle)
  const setAuthor = useRecommendedStore(state => state.setAuthor)

  const onSubmit = handleSubmit(data => {
    setTitle(data.title)
    setAuthor(data.author)
  })

  return (
    <Flex
      direction={{ base: 'column', tablet: 'row', desktop: 'column' }}
      gap={{ base: '20px', tablet: '16px', desktop: '20px' }}
      align="flex-start"
      justify="flex-start"
      flexWrap={{ base: 'nowrap', tablet: 'wrap', desktop: 'nowrap' }}
      w="100%"
    >
      <Box w={{ base: '100%', tablet: '45%', desktop: '295px' }} pr={{ base: 0, tablet: '20px', desktop: 0 }}>
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <Heading
            mb="2"
            pl="3"
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '10px', tablet: '14px' }}
            lineHeight={{ base: '12px', tablet: '18px' }}
            letterSpacing="0.02em"
          >
            Filters:
          </Heading>

          <Stack align="flex-start" gap="2" maxW="100%" mb="5">
            <Field invalid={!!errors.title} errorText={errors.title?.message}>
              <InputElement
                fontFamily="Gilroy-Medium"
                fontSize={{ base: '12px', tablet: '14px' }}
                lineHeight={{ base: '14px', tablet: '18px' }}
                color="brand.muted"
              >
                Book title:
              </InputElement>
              <Input
                ps="6.45em"
                h={{ base: '44px', tablet: '50px' }}
                fontFamily="Gilroy-Medium"
                fontSize={{ base: '12px', tablet: '14px' }}
                lineHeight={{ base: '14px', tablet: '18px' }}
                bg="brand.bgInput"
                rounded="12px"
                placeholder="Enter title"
                variant="subtle"
                {...register('title')}
              />
            </Field>

            <Field invalid={!!errors.author} errorText={errors.author?.message}>
              <InputElement
                fontFamily="Gilroy-Medium"
                fontSize={{ base: '12px', tablet: '14px' }}
                lineHeight={{ base: '14px', tablet: '18px' }}
                color="brand.muted"
              >
                The author:
              </InputElement>
              <Input
                ps="7.05em"
                h={{ base: '44px', tablet: '50px' }}
                fontFamily="Gilroy-Medium"
                fontSize={{ base: '12px', tablet: '14px' }}
                lineHeight={{ base: '14px', tablet: '18px' }}
                bg="brand.bgInput"
                rounded="12px"
                placeholder="Enter author"
                variant="subtle"
                {...register('author')}
              />
            </Field>
          </Stack>

          <Flex justifyContent="space-between" width="full">
            <Button
              h={{ base: '38px', tablet: '42px' }}
              w={{ base: '98px', tablet: '122px' }}
              fontFamily="Gilroy-Bold"
              fontSize={{ base: '14px', tablet: '16px' }}
              lineHeight={{ base: '14px', tablet: '18px' }}
              rounded="30px"
              border="1px solid #f9f9f94d"
              bg="brand.bgSecondary"
              type="submit"
            >
              To apply
            </Button>
          </Flex>
        </form>
      </Box>

      <Box w={{ base: '100%', tablet: '45%', desktop: '313px' }}>
        <Workout />
      </Box>

      <Box w="100%">
        <Expression mt={{ base: '4', tablet: '6' }} />
      </Box>
    </Flex>
  )
}

export default Dashboard
