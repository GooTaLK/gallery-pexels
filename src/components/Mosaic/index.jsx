import React, { useEffect, useRef, useState } from 'react'

import './Mosaic.css'

import { Column } from '../Column'

/**
 * TEMPORAL DATA BASE 👇
 */
const imagesTemplate = [
  {
    id: 1000,
    source: 'https://picsum.photos/500/300',
    alt: 'Generic alt'
  },
  {
    id: 1001,
    source: 'https://picsum.photos/200/230',
    alt: 'Generic alt'
  },
  {
    id: 1002,
    source: 'https://picsum.photos/200/250',
    alt: 'Generic alt'
  },
  {
    id: 1003,
    source: 'https://picsum.photos/200/400',
    alt: 'Generic alt'
  },
  {
    id: 1004,
    source: 'https://picsum.photos/200/200',
    alt: 'Generic alt'
  },
  {
    id: 1005,
    source: 'https://picsum.photos/200/210',
    alt: 'Generic alt'
  },
  {
    id: 1006,
    source: 'https://picsum.photos/200/280',
    alt: 'Generic alt'
  },
  {
    id: 1007,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1008,
    source: 'https://picsum.photos/300/500',
    alt: 'Generic alt'
  },
  {
    id: 1009,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1010,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1011,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1012,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1013,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1014,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1015,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1016,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1017,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1018,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1019,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1020,
    source: 'https://picsum.photos/500/400',
    alt: 'Generic alt'
  },
  {
    id: 1021,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1022,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1023,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1024,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1025,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1026,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1027,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1028,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1029,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  },
  {
    id: 1030,
    source: 'https://picsum.photos/200/300',
    alt: 'Generic alt'
  }
]

const LONG_SCREEN = 1040
const SMALL_SCREEN = 560
const VERY_SMALL_SCREEN = 360
const COLUMNS_IN_LONG_SCREEN = 4
const COLUMNS_BETWEEN_SMALL_AND_LONG_SCREEN = 3
const COLUMNS_BETWEEN_VERY_SMALL_AND_SMALL_SCREEN = 2
const COLUMNS_IN_VERY_SMALL_SCREEN = 1

function loadItems ({ reference = null, newItems, columnsSize, prefix = 'col' }) {
  const columns = reference ? { ...reference } : {}
  let count = 1

  newItems.forEach((itemData) => {
    columns[`${prefix}${count}`] === undefined && (columns[`${prefix}${count}`] = [])
    columns[`${prefix}${count}`].push(itemData)
    count < columnsSize ? count++ : (count = 1)
  })

  return columns
}

export const Mosaic = () => {
  const mosaic = useRef()

  const [columns, setColumns] = useState({ size: 0 })

  useEffect(() => {
    function loadColumns (number) {
      if (columns.size === number) return
      setColumns({ ...loadItems({ newItems: imagesTemplate, columnsSize: number }), size: number })
    }

    function chargeColumns (width) {
      if (width > LONG_SCREEN) loadColumns(COLUMNS_IN_LONG_SCREEN)
      if (width > SMALL_SCREEN && width <= LONG_SCREEN) loadColumns(COLUMNS_BETWEEN_SMALL_AND_LONG_SCREEN)
      if (width > VERY_SMALL_SCREEN && width <= SMALL_SCREEN) loadColumns(COLUMNS_BETWEEN_VERY_SMALL_AND_SMALL_SCREEN)
      if (width <= VERY_SMALL_SCREEN) loadColumns(COLUMNS_IN_VERY_SMALL_SCREEN)
    }

    const resizeObserver = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
          chargeColumns(contentBoxSize.inlineSize)
        } else {
          chargeColumns(entry.contentRect.width)
        }
      }
    })

    chargeColumns(mosaic.current.offsetWidth)
    resizeObserver.observe(mosaic.current)
  }, [])

  function getColumns () {
    if (columns.size === 0) return null

    const columnsArray = []
    let count = 0

    for (const col in columns) {
      if (col !== 'size') {
        columnsArray.push(
          <Column
            items={columns[col]}
            colNumber={count + 1}
            columnsNumber={columns.size}
            key={`col--${count}`}
          />
        )
        count++
      }
    }

    return columnsArray.length !== 0 ? columnsArray : null
  }

  return (
    <div className={`Mosaic Mosaic--cols_${columns.size}`} ref={mosaic}>
      { getColumns() }
    </div>
  )
}
