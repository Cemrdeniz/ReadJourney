import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </BrowserRouter>
)
