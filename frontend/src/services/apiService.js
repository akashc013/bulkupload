import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export async function uploadExcelFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(`${BASE_URL}/api/excel/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export async function getAllShipments() {
  try {
    const response = await axios.get(`${BASE_URL}/api/excel/shipments`)
    return response.data.data
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}
