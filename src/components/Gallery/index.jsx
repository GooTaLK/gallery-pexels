import React, { useEffect } from 'react'
import { usePexelsData } from '../../hooks/usePexelsData'

import { Mosaic } from '../Mosaic'

export const Gallery = ({ promisseCB }) => {
  const {
    data: media,
    loading: photosLoading,
    updateData: updatePhotos,
    resetData
  } = usePexelsData({ promisseCB })

  function handleMainScroll (e) {
    if (media.completed || photosLoading) return

    const EXTRA_CLIENT_HEIGHT = 3
    if (e.target.scrollTop < e.target.scrollHeight - (e.target.clientHeight * (1 + EXTRA_CLIENT_HEIGHT))) return

    updatePhotos()
  }

  useEffect(() => {
    updatePhotos()

    return () => resetData()
  }, [promisseCB])

  return (
    <main className='App-main' onScroll={handleMainScroll} >
      <Mosaic images={media.data} />
    </main>
  )
}
