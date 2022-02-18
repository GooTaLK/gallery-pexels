import './App.css'

import { Header } from './components/Header'
import { Mosaic } from './components/Mosaic'

function App () {
  return (
    <div className='App'>
      <Header />
      <main>
        <Mosaic />
      </main>
    </div>
  )
}

export default App
