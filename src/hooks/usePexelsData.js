import { useState } from 'react'

const initialData = {
  data: [],
  page: 0,
  completed: false
}

let data = initialData

export function usePexelsData ({ dataType = 'photos', promisseCB }) {
  const [savedData, setSavedData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  async function updateData () {
    const page = data.page + 1

    setLoading(true)

    const { [dataType]: promisseData, next_page: nextPage } = await promisseCB(page)
    const newData = {
      completed: nextPage === undefined,
      data: [...data.data, ...promisseData],
      page
    }
    data = newData
    setSavedData(newData)
    setLoading(false)
  }

  function resetData () {
    data = initialData
    setSavedData(initialData)
  }

  return { data: savedData, loading, updateData, resetData }
}
