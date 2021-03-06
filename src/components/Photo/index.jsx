import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { ImagePost } from '../ImagePost'

import { getPhoto } from '../../pexelsAPI'

const ALT_TEXT = 'Photo provided by Pexels'

export const Photo = () => {
  const [photo, setPhoto] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    getPhoto({ id })
      .then((data) => {
        setPhoto(data)
      })
  }, [])

  if (!photo) return null

  return (
    <ImagePost
      url={photo.url}
      source={photo.src.original}
      alt={photo.alt || ALT_TEXT}
      id={photo.id}
      photographer={{
        name: photo.photographer,
        url: photo.photographer_url
      }}
    />
  )
}
