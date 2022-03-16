import { Routes, Route } from 'react-router-dom'

import './App.css'

import { Header } from './components/Header'
import { Home } from './components/Home'
import { Search } from './components/Search'

function App () {
  return (
    <div className='App'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:query' element={<Search />} />
      </Routes>
    </div>
  )
}

export default App
