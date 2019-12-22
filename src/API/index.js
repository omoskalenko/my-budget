import axios from 'axios'

export async function fetchAccounts() {
  try {
    const response = await axios.get('/api/accounts')
    return response.data
  } catch (error) {
    throw Error(error)
  }
  
}

export default {
  fetchAccounts
}
