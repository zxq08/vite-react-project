import { useState } from 'react'
import MyButton from './components/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MyButton />
    </div>
  )
}

export default App
