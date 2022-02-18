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

function loadItems ({ reference = null, newItems, columnsNumber }) {
  const columns = reference ? { ...reference } : {}
  let count = 1

  newItems.forEach((itemData) => {
    columns[`col${count}`] === undefined && (columns[`col${count}`] = [])
    columns[`col${count}`].push(itemData)
    count < columnsNumber ? count++ : (count = 1)
  })

  return columns
}

export const Mosaic = () => {
  const mosaic = useRef()

  const [columns, setColumns] = useState({
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    size: 0
  })

  useEffect(() => {
    function loadColumns (number) {
      if (columns.size === number) return
      setColumns({ ...loadItems({ newItems: imagesTemplate, columnsNumber: number }), size: number })
    }

    function chargeColumns (width) {
      if (width > 1040) loadColumns(4)
      if (width > 560 && width <= 1040) loadColumns(3)
      if (width > 360 && width <= 560) loadColumns(2)
      if (width <= 360) loadColumns(1)
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

  return (
    <div className={`Mosaic Mosaic--cols_${columns.size}`} ref={mosaic}>
      {columns.col1?.length &&
        <Column
          items={columns.col1}
          colNumber={1}
          columnsNumber={columns.size}
        />
      }
      {columns.col2?.length &&
        <Column
          items={columns.col2}
          colNumber={2}
          columnsNumber={columns.size}
        />
      }
      {columns.col3?.length &&
        <Column
          items={columns.col3}
          colNumber={3}
          columnsNumber={columns.size}
        />
      }
      {columns.col4?.length &&
        <Column
          items={columns.col4}
          colNumber={4}
          columnsNumber={columns.size}
        />
      }
    </div>
  )
}
