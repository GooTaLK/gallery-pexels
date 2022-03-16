import { useParams } from 'react-router-dom'

import { Gallery } from '../Gallery'

import { searchPhotos } from '../../pexelsAPI'

export const Search = () => {
  const { query } = useParams()

  return (
    <Gallery promisseCB={async (page) => searchPhotos({ page, query })} />
  )
}
