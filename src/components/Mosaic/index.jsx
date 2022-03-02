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

function getColumnsNumber (width) {
  if (width > screen.LONG) return columnsQuantity.IN_LONG_SCREEN
  if (width > screen.SMALL && width <= screen.LONG) return columnsQuantity.BETWEEN_SMALL_AND_LONG_SCREEN
  if (width > screen.VERY_SMALL && width <= screen.SMALL) return columnsQuantity.BETWEEN_VERY_SMALL_AND_SMALL_SCREEN
  if (width <= screen.VERY_SMALL) return columnsQuantity.IN_VERY_SMALL_SCREEN
}

function addItems ({ reference = null, newItems = [], columnsSize, prefix = 'col' }) {
  const columns = reference ? { ...reference } : {}
  let count = 1

  newItems.forEach((itemData) => {
    columns[`${prefix}${count}`] === undefined && (columns[`${prefix}${count}`] = [])
    columns[`${prefix}${count}`].push(itemData)
    count < columnsSize ? count++ : (count = 1)
  })

  return columns
}

export const Mosaic = ({ newImages }) => {
  if (!newImages) return null

  const mosaic = useRef()

  const [columns, setColumns] = useState({ size: 0 })
  const [modal, setModal] = useState({ open: false, childrenProps: {} })

  function addColumns (width, isNew = true) {
    const columnsNumber = getColumnsNumber(width)

    if (!isNew && columnsNumber === columns.size) return
    const ref = isNew ? columns : null

    setColumns({
      ...addItems({
        reference: ref,
        newItems: newImages,
        columnsSize: columnsNumber
      }),
      size: columnsNumber
    })
  }

  function handleShowImage (id, colNumber) {
    const childrenProps = columns[`col${colNumber}`].find(({ id: imageId }) => id === imageId)
    setModal({ childrenProps, open: true })
  }

  function getColumns () {
    if (columns.size === 0) return null

    const columnsArray = []
    let count = 1

    for (const col in columns) {
      if (col !== 'size') {
        columnsArray.push(
          <Column
            items={columns[col]}
            colNumber={count}
            columnsNumber={columns.size}
            onClickItem={handleShowImage}
            key={`col--${count}`}
          />
        )
        count++
      }
    }

    return columnsArray.length !== 0 ? columnsArray : null
  }

  useLayoutEffect(() => {
    addColumns(mosaic.current.offsetWidth)
  }, [newImages])

  useLayoutEffect(() => {
    const resizeObserver = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
          addColumns(contentBoxSize.inlineSize, false)
        } else {
          addColumns(entry.contentRect.width, false)
        }
      }
    })

    resizeObserver.observe(mosaic.current)
  }, [])

  return (
    <div className={`Mosaic Mosaic--cols_${columns.size}`} ref={mosaic}>
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
