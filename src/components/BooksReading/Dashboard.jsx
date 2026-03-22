import { useEffect, useState } from 'react'
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
  Circle,
  Text,
  Image
} from '@chakra-ui/react'

import { Field } from '@/components/ui/field.jsx'
import toast from '@/utils/toast'

import star from '@/assets/icons/star.svg'
import hourglassA from '@/assets/icons/hourglass-active.svg'
import hourglassU from '@/assets/icons/hourglass-unactive.svg'
import chartA from '@/assets/icons/pie-chart-active.svg'
import chartU from '@/assets/icons/pie-chart-unactive.svg'

import Diary from './Diary'
import Statiatics from './Statiatics'

import { useReadingStore } from '@/stores/readingStore.js'
import { useNavigate } from 'react-router-dom'
import { getReadingBookApi } from '@/services/api'

const schema = yup.object({
  page: yup
    .number()
    .typeError('Must be a number')
    .required('Page is required')
})

function Dashboard() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()

  const book = useReadingStore(state => state.book)
  const isReading = useReadingStore(state => state.isReading)

  const setReadingStart = useReadingStore(state => state.setReadingStart)
  const setReadingStop = useReadingStore(state => state.setReadingStop)

  const [hourglass, setHourglass] = useState(false)
  const completedProgress = Array.isArray(book?.progress)
    ? book.progress.filter(item =>
        item?.finishPage != null && item?.startPage != null
      )
    : []
  const lastFinishedPage = completedProgress.length
    ? completedProgress[completedProgress.length - 1]?.finishPage
    : null
  const pagePlaceholder = !isReading && lastFinishedPage
    ? String(lastFinishedPage)
    : '000'

  const toggleHourglass = () => setHourglass(prev => !prev)

  // ✅ SUBMIT
  const onSubmit = async (data) => {
    if (!book?._id) {
      return toast('error', 'Book not found')
    }

    const pageNumber = Number(data.page)

    if (!pageNumber || pageNumber <= 0) {
      return toast('error', 'Invalid page number')
    }

    try {
      // ▶️ START
      if (!isReading) {
        await setReadingStart({ page: pageNumber })

        useReadingStore.setState({ isReading: true })

        navigate(`/reading/${book._id}`)

        toast('success', 'Reading started')
      }

      // ⏹️ STOP
      else {
        await setReadingStop({ page: pageNumber })

        useReadingStore.setState({ isReading: false })

        toast('success', 'Reading stopped')
      }

      reset()

    } catch (err) {
      console.log('SUBMIT ERROR:', err)
      toast('error', 'Something went wrong')
    }
  }

  // 🔄 FETCH BOOK (SAFE)
  useEffect(() => {
    if (!book?._id) return

    let isMounted = true

    const fetchBook = async () => {
      try {
        if (!book?._id) return

        const current = await getReadingBookApi(book._id)

        if (!isMounted) return

        useReadingStore.setState({
          book: current
        })

      } catch (err) {
        console.log('FETCH ERROR:', err?.response?.status || err)
      }
    }

    fetchBook()

    const interval = setInterval(fetchBook, 3000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }

  }, [book?._id])

  return (
    <>
      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: 295, marginBottom: 40 }}>
        <Heading mb="2" pl="3">
          {!isReading ? 'Start page:' : 'Stop page:'}
        </Heading>

        <Stack gap="2" mb="5">
          <Field invalid={!!errors.page} errorText={errors.page?.message}>
            <InputElement>Page number:</InputElement>

            <Input
              ps="8.05em"
              h="44px"
              placeholder={pagePlaceholder}
              {...register('page')}
            />
          </Field>
        </Stack>

        <Flex>
          <Button type="submit">
            {!isReading ? 'To start' : 'To stop'}
          </Button>
        </Flex>
      </form>

      {/* EMPTY */}
      {!isReading && (
        <Flex direction="column" h="244px" w="295px">
          <Heading>Progress</Heading>

          <Text>Here you will see when and how much you read.</Text>

          <Circle mx="auto" size="80px">
            <Image src={star} />
          </Circle>
        </Flex>
      )}

      {/* READING */}
      {isReading && (
        <Flex direction="column">
          <Flex justifyContent="space-between">
            <Heading>
              {hourglass ? 'Statistics' : 'Diary'}
            </Heading>

            <Flex gap="2">
              <Image
                src={hourglass ? hourglassU : hourglassA}
                onClick={toggleHourglass}
                cursor="pointer"
              />
              <Image
                src={!hourglass ? chartU : chartA}
                onClick={toggleHourglass}
                cursor="pointer"
              />
            </Flex>
          </Flex>

          {hourglass ? <Statiatics /> : <Diary />}
        </Flex>
      )}
    </>
  )
}

export default Dashboard
