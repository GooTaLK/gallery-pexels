import './Header.css'

import pexelsSrc from '../../assets/pexels-icon.svg'

export const Header = () => {
  return (
    <header className='Header App-Header'>
      <div className='Header-logo'>
        <h1>Gallery</h1>
      </div>
      <div className='Header-search_wrapper'>
        <input className='Header-search_input' type='search' placeholder='Search images'/>
      </div>
      <div className='Header-pexels_link'>
        <a
          href='https://pexels.com'
          target='_blank'
          rel='noreferrer noopener'
          title='Photos provided by Pexels'
        >
          <img src={pexelsSrc} alt="Pexels" />
        </a>
      </div>
    </header>
  )
}
