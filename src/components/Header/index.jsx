import './Header.css'

export const Header = () => {
  return (
    <header className='Header'>
      <div className="Header-logo">
        <h1>Gallery</h1>
      </div>
      <div className="Header-search_wrapper">
        <input className='Header-search_input' type="search" placeholder='Search images'/>
      </div>
    </header>
  )
}
