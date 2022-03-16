import { useState } from 'react'

export function usePexelsData ({ dataType = 'photos', promisseCB }) {
  const [savedData, setData] = useState({
    data: [],
    page: 0,
    completed: false
  })
  const [loading, setLoading] = useState(false)

  async function updateData () {
    const page = savedData.page + 1

    setLoading(true)

    const { [dataType]: data, next_page: nextPage } = await promisseCB(page)

    setData({
      completed: nextPage === undefined,
      data: [...savedData.data, ...data],
      page
    })
    setLoading(false)
  }

  return { data: savedData, loading, updateData }
}
