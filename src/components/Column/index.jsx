import './Column.css'

export const Column = ({ items, colNumber, onClickItem }) => {
  return (
    <div className={`Column Column--${colNumber}`}>
    {
      items.map(({ id, src, alt }) => (
        <figure
          className='Column-item'
          onClick={() => onClickItem(id, colNumber)}
          key={`item--${id}`}
        >
          <figcaption>{alt}</figcaption>
          <img src={src.medium} alt={alt} loading='lazy' />
        </figure>
      ))
    }
    </div>
  )
}
