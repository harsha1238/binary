import { useState } from 'react'
import Home from "./components/home"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <h3>Binary Logic</h3>
   <Home/>
   </>
  )
}

export default App
