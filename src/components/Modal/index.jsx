import React, { useEffect, useRef } from 'react'
import './Modal.css'

export const Modal = ({ open = false, toClose, children }) => {
  if (!open) return null

  const modal = useRef()

  function handleKeydownEsc (e) {
    if (e.key !== 'Escape') return
    toClose()
  }

  useEffect(() => {
    modal.current.focus()
  }, [open])

  return (
    <>
      <div className='Modal-overlay' onClick={toClose}/>
      <div
        className='Modal'
        onKeyDown={handleKeydownEsc}
        tabIndex='0'
        ref={modal}
      >
        {children}
      </div>
    </>
  )
}
