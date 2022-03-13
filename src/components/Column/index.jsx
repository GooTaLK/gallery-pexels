import './Column.css'

export const Column = ({ items, onClickItem }) => {
  return (
    <div className='Column'>
    {
      items.map(({ id, src, alt }) => (
        <figure
          className='Column-item'
          onClick={() => onClickItem(id)}
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
