const API_KEY = ''

async function fetchPexelsAPI (url) {
  try {
    const response = await window.fetch(url,
      { headers: { Authorization: API_KEY } }
    )
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export async function getCuratedPhotos ({ perPage = 80 } = {}) {
  return await fetchPexelsAPI(`https://api.pexels.com/v1/curated?per_page=${perPage}`)
}

export async function searchPhotos ({ query, perPage = 80 }) {
  return await fetchPexelsAPI(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`)
}

export async function getPhoto ({ id }) {
  return await fetchPexelsAPI(`https://api.pexels.com/v1/photos/${id}`)
}
