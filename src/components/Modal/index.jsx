import './Modal.css'

export const Modal = ({ open = false, children }) => {
  if (!open) return null

  return (
    <>
      <div className="Modal-overlay" />
      <div className='Modal'>{children}</div>
    </>
  )
}
