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
    email: yup
      .string()
      .email()
      .min(3)
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      .required(),
    password: yup.string().min(7).required()
  })
  .required()

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const signinUser = useAuthStore(state => state.signinUser)
  const isLoading = useAuthStore(state => state.isLoading)
  
  const onSubmit = handleSubmit(data => signinUser(data))

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
        mb={{ base: '40px', tablet: '146px' }}
        gap={{ base: '8px', tablet: '14px' }}
        maxW={{ base: '295px', tablet: '472px' }}
      >
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
          w={{ base: '140px', tablet: '166px' }}
          fontFamily="Gilroy-Bold"
          fontSize={{ base: '14px', tablet: '20px' }}
          lineHeight={{ base: '14px', tablet: '20px' }}
          rounded="30px"
          color="brand.bgSecondary"
          bg="brand.accent"
          type="submit"
        >
          {!isLoading ? 'Log in' : <Spinner />}
        </Button>

        <Link
          variant="underline"
          fontFamily="Gilroy-Medium"
          fontSize={{ base: '12px', tablet: '14px' }}
          lineHeight={{ base: '14px', tablet: '18px' }}
          letterSpacing="-0.02em"
          color="brand.muted"
          href="/register"
        >
          Don’t have an account?
        </Link>
      </Flex>
    </form>
  )
}

export default LoginForm
