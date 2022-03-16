import { Gallery } from '../Gallery'

import { getCuratedPhotos } from '../../pexelsAPI'

export const Home = () => {
  return (
    <Gallery promisseCB={async (page) => await getCuratedPhotos({ page })}/>
  )
}
