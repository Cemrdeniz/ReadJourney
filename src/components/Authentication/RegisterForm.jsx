import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Button,
  Input,
  InputElement,
  Stack,
  Flex,
  Link,
  Spinner
} from '@chakra-ui/react'
import { Field } from '@/components/ui/field.jsx'
import { PasswordInput } from '@/components/ui/password-input.jsx'
import { useAuthStore } from '@/stores/authStore.js'

const schema = yup
  .object({
    name: yup.string().min(2).required(),
    email: yup
      .string()
      .email()
      .min(3)
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      .required(),
    password: yup.string().min(7).required()
  })
  .required()

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const signupUser = useAuthStore(state => state.signupUser)
  const isLoading = useAuthStore(state => state.isLoading)
  const sent = useAuthStore(state => state.sent)
  
  const onSubmit = handleSubmit(data => signupUser(data))

  useEffect(() => {
    if (sent) {
      navigate('/login')
    }
  }, [navigate, sent])

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
      onSubmit={onSubmit}
    >
      <Stack
        align="flex-start"
        mb={{ base: '20px', tablet: '82px' }}
        gap={{ base: '8px', tablet: '14px' }}
        maxW={{ base: '295px', tablet: '472px' }}
      >
        <Field invalid={!!errors.name} errorText={errors.name?.message}>
          <InputElement
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '12px', tablet: '14px' }}
            lineHeight={{ base: '14px', tablet: '18px' }}
            color="brand.muted"
          >
            Name:
          </InputElement>
          <Input
            ps="4.65em"
            h={{ base: '44px', tablet: '50px' }}
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '12px', tablet: '14px' }}
            lineHeight={{ base: '14px', tablet: '18px' }}
            bg="brand.bgInput"
            rounded="12px"
            placeholder="Your Name"
            variant="subtle"
            {...register('name', { required: 'name is required' })}
          />
        </Field>

        <Field invalid={!!errors.email} errorText={errors.email?.message}>
          <InputElement
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '12px', tablet: '14px' }}
            lineHeight={{ base: '14px', tablet: '18px' }}
            color="brand.muted"
          >
            Email:
          </InputElement>
          <Input
            ps="4.25em"
            h={{ base: '44px', tablet: '50px' }}
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '12px', tablet: '14px' }}
            lineHeight={{ base: '14px', tablet: '18px' }}
            bg="brand.bgInput"
            rounded="12px"
            placeholder="Your Email"
            variant="subtle"
            {...register('email', { required: 'email is required' })}
          />
        </Field>

        <Field invalid={!!errors.password} errorText={errors.password?.message}>
          <InputElement
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '12px', tablet: '14px' }}
            lineHeight={{ base: '14px', tablet: '18px' }}
            color="brand.muted"
          >
            Password:
          </InputElement>
          <PasswordInput
            ps="6.25em"
            h={{ base: '44px', tablet: '50px' }}
            fontFamily="Gilroy-Medium"
            fontSize={{ base: '12px', tablet: '14px' }}
            lineHeight={{ base: '14px', tablet: '18px' }}
            bg="brand.bgInput"
            rounded="12px"
            placeholder="Your Password"
            variant="subtle"
            {...register('password', { required: 'password is required' })}
          />
        </Field>
      </Stack>

      <Flex gap={{ base: '10px', tablet: '20px' }}>
        <Button
          h={{ base: '42px', tablet: '52px' }}
          w={{ base: '140px', tablet: '225px' }}
          fontFamily="Gilroy-Bold"
          fontSize={{ base: '14px', tablet: '20px' }}
          lineHeight={{ base: '14px', tablet: '20px' }}
          rounded="30px"
          color="brand.bgSecondary"
          bg="brand.accent"
          type="submit"
        >
          {!isLoading ? 'Registration' : <Spinner />}
        </Button>

        <Link
          variant="underline"
          fontFamily="Gilroy-Medium"
          fontSize={{ base: '12px', tablet: '14px' }}
          lineHeight={{ base: '14px', tablet: '18px' }}
          letterSpacing="-0.02em"
          color="brand.muted"
          href="/login"
        >
          Already have an account?
        </Link>
      </Flex>
    </form>
  )
}

export default RegisterForm
