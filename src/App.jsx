import React, { useEffect, useState } from 'react'
import './App.css'

import { Header } from './components/Header'
import { Mosaic } from './components/Mosaic'

import { getCuratedPhotos } from './pexelsAPI'

function App () {
  const [newCuratedImages, setNewCuratedImages] = useState(null)

  useEffect(() => {
    getCuratedPhotos().then(({ photos }) => setNewCuratedImages(photos))
  }, [])

  return (
    <div className='App'>
      <Header />
      <main>
        <Mosaic newImages={newCuratedImages} />
      </main>
    </div>
  )
}

export default App
