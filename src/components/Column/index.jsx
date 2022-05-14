import './Column.css'

const ALT_TEXT = 'Photo provided by Pexels'

export const Column = ({ items, onClickItem }) => {
  return (
    <div className='Column'>
    {
      items.map(({ id, src, alt: itemAlt }) => {
        const alt = itemAlt || ALT_TEXT

        return (
          <figure
            className='Column-item'
            onClick={() => onClickItem(id)}
            key={`item--${id}`}
          >
            <figcaption>{alt}</figcaption>
            <img src={src.medium} alt={alt} loading='lazy' />
          </figure>
        )
      })
    }
    </div>
  )
}
