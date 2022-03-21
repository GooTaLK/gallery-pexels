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
    query !== '' && navigate(`/search/${query}`)
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
