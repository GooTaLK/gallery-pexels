import './ImagePost.css'

export const ImagePost = ({
  url,
  source,
  alt,
  photographer = { name: '', url: '' }
}) => {
  return (
    <article className="ImagePost">
      <section className="ImagePost-image">
        <img src={source} alt={alt} />
      </section>
      <section className="ImagePost-info">
        <div className='ImagePost-info-title'>
          <span>
            <a
              href={url}
              target='_blank'
              rel='noreferrer noopener'
              title='Go to original post'
            >
              {alt} <i>↗</i>
            </a>
          </span>
        </div>
        <div className='ImagePost-info-photographer'>
          <span>
            By: <a href={photographer.url} target='_blank' rel='noreferrer noopener'>{photographer.name}</a>
          </span>
        </div>
      </section>
    </article>
  )
}
