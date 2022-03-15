import React, { useEffect, useState } from 'react'

import { Mosaic } from '../Mosaic'

import { getCuratedPhotos } from '../../pexelsAPI'

export const Home = () => {
  const [curatedPhotos, setCuratedPhotos] = useState({
    photos: [],
    page: 0,
    completed: false
  })
  const [photosLoading, setPhotosLoading] = useState(false)

  function updateCuratedPhotos () {
    const page = curatedPhotos.page + 1

    setPhotosLoading(true)

    getCuratedPhotos({ page })
      .then(({ photos, next_page: nextPage }) => {
        setCuratedPhotos({
          completed: nextPage === undefined,
          photos: [...curatedPhotos.photos, ...photos],
          page
        })
      })
      .finally(() => setPhotosLoading(false))
  }

  function handleMainScroll (e) {
    if (curatedPhotos.completed) return

    const scrollPointToUpdate = e.target.scrollHeight - (e.target.clientHeight * 4)
    if (e.target.scrollTop >= scrollPointToUpdate && !photosLoading) {
      updateCuratedPhotos()
      console.log('scroll exec')
    }
  }

  useEffect(() => {
    updateCuratedPhotos()
  }, [])

  return (
    <main className='App-main' onScroll={handleMainScroll} >
      <Mosaic images={curatedPhotos.photos} />
    </main>
  )
}
