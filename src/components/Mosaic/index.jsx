import { useLayoutEffect, useRef, useState } from 'react'

import './Mosaic.css'

import { Column } from '../Column'
import { Modal } from '../Modal'
import { ImagePostModal } from '../ImagePostModal'

import { useResizeObserver } from '../../hooks/useResizeObsever'

const screen = {
  LONG: 1040,
  SMALL: 560,
  VERY_SMALL: 360
}
const columnsQuantity = {
  IN_LONG_SCREEN: 4,
  BETWEEN_SMALL_AND_LONG_SCREEN: 3,
  BETWEEN_VERY_SMALL_AND_SMALL_SCREEN: 2,
  IN_VERY_SMALL_SCREEN: 2
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

  const [columns, setColumns] = useState({ columns: {}, size: 0 })
  const [modal, setModal] = useState({ open: false })
  const [postProps, setPostProps] = useState(null)

  loadColumns = ({ width, hasNewImages = false }) => {
    const columnsNumber = getColumnsNumber(width)
    if (!hasNewImages && columnsNumber === columns.size) return

    setColumns({
      columns: loadImages({ images, columnsNumber }),
      size: columnsNumber
    })
  }

  function handleOpenModal (id) {
    const imagePostProps = images.find(({ id: imageId }) => id === imageId)

    setModal({ open: true })
    setPostProps(imagePostProps)
  }

  function handleCloseModal () {
    setModal({ open: false })
    setPostProps({})
  }

  function getColumns () {
    if (columns.size === 0) return null

    const columnsNames = Object.keys(columns.columns)
    const columnsArray = columnsNames.map((name, index) => {
      return (
        <Column
          items={columns.columns[name]}
          onClickItem={handleOpenModal}
          key={`col--${index + 1}`}
        />
      )
    })

    return columnsArray.length !== 0 ? columnsArray : null
  }

  useLayoutEffect(() => {
    loadColumns({ width: mosaic.current.offsetWidth, hasNewImages: true })
  }, [images])

  useResizeObserver(({ inlineSize, width }) => {
    if (inlineSize) {
      loadColumns({ width: inlineSize })
    } else {
      loadColumns({ width })
    }
  }, mosaic)

  return (
    <div className='Mosaic' data-columns-quantity={columns.size} ref={mosaic}>
      {getColumns()}
      <Modal
        open={modal.open}
        toClose={handleCloseModal}
      >
        <ImagePostModal topButtonAction={handleCloseModal} {...postProps}/>
      </Modal>
    </div>
  )
}
