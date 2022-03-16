import React, { useEffect } from 'react'
import { usePexelsData } from '../../hooks/usePexelsData'

import { Mosaic } from '../Mosaic'

import { getCuratedPhotos } from '../../pexelsAPI'

export const Home = () => {
  const {
    data: photos,
    loading: photosLoading,
    updateData: updatePhotos
  } = usePexelsData({ promisseCB: async (page) => await getCuratedPhotos({ page }) })

  function handleMainScroll (e) {
    if (photos.completed || photosLoading) return

    const EXTRA_CLIENT_HEIGHT = 3
    if (e.target.scrollTop < e.target.scrollHeight - (e.target.clientHeight * (1 + EXTRA_CLIENT_HEIGHT))) return

    updatePhotos()
  }

  useEffect(() => {
    updatePhotos()
  }, [])

  return (
    <main className='App-main' onScroll={handleMainScroll} >
      <Mosaic images={photos.data} />
    </main>
  )
}
