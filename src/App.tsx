import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RouterManager from './routes/routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <RouterManager />
    </div>
  )
}

export default App
