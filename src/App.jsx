import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 class="text-3xl bg-amber-300 text-black p-4 font-bold underline">Hello world!</h1>
    </>
  );
}

export default App
