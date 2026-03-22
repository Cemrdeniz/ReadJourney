import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Button, Input, InputElement, Stack, Flex, Heading
} from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import DialogBookStat from '../DialogBookStat'
import RecommendedBooks from './RecommendedBooks'
import { useLibraryStore } from '@/stores/libraryStore.js'

const schemaLib = yup
  .object({
    title: yup.string().required('Page is required'),
    author: yup.string().required('Page is required'),
    totalPages: yup
      .number()
      .typeError('Must be only digits')
      .positive('Must be a positive number')
      .integer('Must be an integer')
      .min(1, 'Must be greater than 0')
      .max(9999, 'Must be less than 9999')
      .required('Pages is required')
  })
  .required()

function Dashboard() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaLib)
  })

  const addBook = useLibraryStore(state => state.addBook)
  const isAdded = useLibraryStore(state => state.isAdded)

  const onSubmit = (data) => {
    addBook({
      title: data.title,
      author: data.author,
      totalPages: Number(data.totalPages)
    })

    reset()
  }

  return (
    <>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Heading
          mb="2"
          pl="3"
          fontFamily="Gilroy-Medium"
          fontSize={{ base: '10px', tablet: '14px' }}
          lineHeight={{ base: '12px', tablet: '18px' }}
          letterSpacing="0.02em"
        >
          Create your library:
        </Heading>

        <Stack align="flex-start" gap="2" maxW="100%" mb="5">
          <Field invalid={!!errors.title} errorText={errors.title?.message}>
            <InputElement>Book title:</InputElement>
            <Input
              ps="6.45em"
              h={{ base: '44px', tablet: '50px' }}
              w={{ base: '100%', tablet: '320px', desktop: '100%' }}
              bg="brand.bgInput"
              rounded="12px"
              placeholder="Enter title"
              variant="subtle"
              {...register('title', { required: 'title is required' })}
            />
          </Field>

          <Field invalid={!!errors.author} errorText={errors.author?.message}>
            <InputElement>The author:</InputElement>
            <Input
              ps="7.05em"
              h={{ base: '44px', tablet: '50px' }}
              w={{ base: '100%', tablet: '320px', desktop: '100%' }}
              bg="brand.bgInput"
              rounded="12px"
              placeholder="Enter author"
              variant="subtle"
              {...register('author', { required: 'author is required' })}
            />
          </Field>

          <Field
            invalid={!!errors.totalPages}
            errorText={errors.totalPages?.message}
          >
            <InputElement>Number of pages:</InputElement>
            <Input
              ps="10.05em"
              h={{ base: '44px', tablet: '50px' }}
              w={{ base: '100%', tablet: '320px', desktop: '100%' }}
              bg="brand.bgInput"
              rounded="12px"
              placeholder="Enter pages"
              variant="subtle"
              {...register('totalPages', { required: 'pages is required' })}
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
            Add book
          </Button>
        </Flex>
      </form>

      <RecommendedBooks />
      {isAdded && <DialogBookStat />}
    </>
  )
}

export default Dashboard