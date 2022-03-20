const API_KEY = '563492ad6f917000010000016f3eeebdb1f346ec9076c3b9d5a4c7c0'

async function fetchPexelsAPI (url) {
  try {
    const response = await window.fetch(url,
      { headers: { Authorization: API_KEY } }
    )
    return await response.json()
  } catch (error) {
    console.log('An error fetching Pexels appear')
    console.error(error)
  }
}

export async function getCuratedPhotos ({ page = 1, perPage = 80 } = {}) {
  return await fetchPexelsAPI(`https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`)
}

export async function searchPhotos ({ query, page = 1, perPage = 80 }) {
  return await fetchPexelsAPI(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPage}`)
}

export async function getPhoto ({ id }) {
  return await fetchPexelsAPI(`https://api.pexels.com/v1/photos/${id}`)
}
