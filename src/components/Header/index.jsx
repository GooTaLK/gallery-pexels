import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Header.css'

import pexelsSrc from '../../assets/pexels-icon.svg'

export const Header = () => {
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  function handleLogoClick () {
    setSearchValue('')
  }

  function handleSearchValue (e) {
    setSearchValue(e.target.value)
  }

  function handleSearchInput (e) {
    if (e.key !== 'Enter') return

    const query = e.target.value
    if (query !== '') {
      e.target.blur()
      navigate(`/search/${query}`)
    }
  }

  function handleSearchIconClick () {
    searchValue !== '' && navigate(`/search/${searchValue}`)
  }

  return (
    <header className='Header App-Header'>
      <div className='Header-logo'>
        <h1><Link to ='/' onClick={handleLogoClick}>Gallery</Link></h1>
      </div>
      <div className='Header-search_wrapper'>
        <input
          className='Header-search_input'
          type='search'
          placeholder='Search images'
          value={searchValue}
          onInput={handleSearchValue}
          onKeyDown={handleSearchInput}
        />
        <span className='Header-search_icon' onClick={handleSearchIconClick}>
          <svg x='0px' y='0px'viewBox='0 0 183.792 183.792' >
            <path d='M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22
              c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583
              c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0
              C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806
              c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25
              c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z'/>
            </svg>
        </span>
      </div>
      <div className='Header-pexels_link'>
        <a
          href='https://pexels.com'
          target='_blank'
          rel='noreferrer noopener'
          title='Photos provided by Pexels'
        >
          <img src={pexelsSrc} alt='Pexels' />
        </a>
      </div>
    </header>
  )
}
