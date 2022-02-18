import './Column.css'

export const Column = ({ items, colNumber }) => {
  return (
    <div className={`Column Column--${colNumber}`}>
    {
      items.map(({ id, source, alt }) => (
        <figure className='Column-item' data-item-id={id} key={`item--${id}`}>
          <figcaption>{alt}</figcaption>
          <img src={source} alt={alt} />
        </figure>
      ))
    }
    </div>
  )
}
