import { ImagePost } from '../ImagePost'

import './ImagePostModal.css'

const ALT_TEXT = 'Photo provided by Pexels'

export const ImagePostModal = ({
  topButtonAction,
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
      <div className='ImagePostModal-closeButton' onClick={topButtonAction}>
        <svg width='32px' height='32px' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
          <path d='M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z'/>
        </svg>
      </div>
    </div>
  )
}
