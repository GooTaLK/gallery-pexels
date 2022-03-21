import { useParams } from 'react-router-dom'

import { Gallery } from '../Gallery'

import { searchPhotos } from '../../pexelsAPI'

export const Search = () => {
  const { query } = useParams()

  async function searchCallback (page) {
    return await searchPhotos({ page, query })
  }

  return (
    <Gallery promisseCB={searchCallback} />
  )
}
