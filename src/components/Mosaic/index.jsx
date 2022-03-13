import React, { useLayoutEffect, useRef, useState } from 'react'

import './Mosaic.css'

import { Column } from '../Column'
import { Modal } from '../Modal'
import { ImagePost } from '../ImagePost'

const screen = {
  LONG: 1040,
  SMALL: 560,
  VERY_SMALL: 360
}
const columnsQuantity = {
  IN_LONG_SCREEN: 4,
  BETWEEN_SMALL_AND_LONG_SCREEN: 3,
  BETWEEN_VERY_SMALL_AND_SMALL_SCREEN: 2,
  IN_VERY_SMALL_SCREEN: 1
}

let loadColumns

function getColumnsNumber (width) {
  if (width > screen.LONG) return columnsQuantity.IN_LONG_SCREEN
  if (width > screen.SMALL && width <= screen.LONG) return columnsQuantity.BETWEEN_SMALL_AND_LONG_SCREEN
  if (width > screen.VERY_SMALL && width <= screen.SMALL) return columnsQuantity.BETWEEN_VERY_SMALL_AND_SMALL_SCREEN
  if (width <= screen.VERY_SMALL) return columnsQuantity.IN_VERY_SMALL_SCREEN
}

function loadImages ({ images, columnsNumber, prefix = 'col' }) {
  const columns = {}
  let count = 1

  images.forEach((imageData) => {
    columns[`${prefix}${count}`] ?? (columns[`${prefix}${count}`] = [])
    columns[`${prefix}${count}`].push(imageData)
    count < columnsNumber ? count++ : (count = 1)
  })

  return columns
}

export const Mosaic = ({ images }) => {
  if (!images || images?.length === 0) return null

  const mosaic = useRef()

  const [columns, setColumns] = useState({ size: 0 })
  const [modal, setModal] = useState({ open: false, childrenProps: {} })

  loadColumns = ({ width, hasNewImages = false }) => {
    const columnsNumber = getColumnsNumber(width)
    if (!hasNewImages && columnsNumber === columns.size) return

    setColumns({
      ...loadImages({ images, columnsNumber }),
      size: columnsNumber
    })
  }

  function handleShowImage (id) {
    const childrenProps = images.find(({ id: imageId }) => id === imageId)
    setModal({ childrenProps, open: true })
  }

  function getColumns () {
    if (columns.size === 0) return null

    const columnsNames = Object.keys(columns).filter((name) => name !== 'size')
    const columnsArray = columnsNames.map((name, index) => {
      return (
        <Column
          items={columns[name]}
          onClickItem={handleShowImage}
          key={`col--${index + 1}`}
        />
      )
    })

    return columnsArray.length !== 0 ? columnsArray : null
  }

  useLayoutEffect(() => {
    loadColumns({ width: mosaic.current.offsetWidth, hasNewImages: true })
  }, [images])

  useLayoutEffect(() => {
    const resizeObserver = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
          loadColumns({ width: contentBoxSize.inlineSize })
        } else {
          loadColumns({ width: entry.contentRect.width })
        }
      }
    })

    resizeObserver.observe(mosaic.current)
  }, [])

  return (
    <div className='Mosaic' data-columns-quantity={columns.size} ref={mosaic}>
      {
        getColumns()
      }
      <Modal open={modal.open} toClose={() => setModal({ open: false, childrenProps: null })}>
        <ImagePost
          url={modal.childrenProps?.url ?? modal.childrenProps?.src?.original}
          source={modal.childrenProps?.src?.original}
          alt={modal.childrenProps?.alt}
          width={modal.childrenProps?.width}
          height={modal.childrenProps?.height}
          photographer={{ name: modal.childrenProps?.photographer, url: modal.childrenProps?.photographer_url }}
        />
      </Modal>
    </div>
  )
}
