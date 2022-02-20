import './Column.css'

export const Column = ({ items, colNumber, onClickItem }) => {
  return (
    <div className={`Column Column--${colNumber}`}>
    {
      items.map(({ id, source, alt }) => (
        <figure
          className='Column-item'
          onClick={() => onClickItem(id)}
          key={`item--${id}`}
        >
          <figcaption>{alt}</figcaption>
          <img src={source} alt={alt} />
        </figure>
      ))
    }
    </div>
  )
}
