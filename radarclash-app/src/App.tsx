import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from "@/components/theme-provider"


function App() {
  const [count, setCount] = useState(0)

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='text-2xl'>
        hello world
        <Button variant="default">hello</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
