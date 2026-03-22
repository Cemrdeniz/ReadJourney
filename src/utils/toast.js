import { toaster } from '@/components/ui/toaster'

function toast(type, message) {
  return toaster.create({
    description: message,
    type: type
  })
}

export default toast
