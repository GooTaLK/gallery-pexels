import { ImagePost } from '../ImagePost'

import './ImagePostModal.css'

const ALT_TEXT = 'Photo provided by Pexels'

export const ImagePostModal = ({
  url,
  src,
  alt,
  id,
  photographer,
  photographer_url: photographerUrl
}) => {
  return (
    <div className='ImagePostModal'>
      <ImagePost
        redirect
        url={url}
        source={src?.original}
        alt={alt || ALT_TEXT}
        id={id}
        photographer={{
          name: photographer,
          url: photographerUrl
        }}
      />
    </div>
  )
}
