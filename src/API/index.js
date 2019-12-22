import axios from 'axios'

export async function fetchAccounts() {
  try {
    const response = await axios.get('/api/accounts')
    return response.data
  } catch (error) {
    throw Error(error)
  }
}

export async function fetchCosts() {
  try {
    const response = await axios.get('/api/costs/committed')
    return response.data
  } catch (error) {
    throw Error(error)
  }
}

export async function addCost(cost) {
  try {
    const response = await axios.post('/api/costs/add', cost)
    return response.data.cost
  } catch (error) {
    throw Error(error)
  }
}

export async function fetchIncomes() {
  try {
    const response = await axios.get('/api/incomes/committed')
    return response.data
  } catch (error) {
    throw Error(error)
  }
}

export async function addIncomes(cost) {
  try {
    const response = await axios.post('/api/incomes/add', cost)
    return response.data.incomes
  } catch (error) {
    throw Error(error)
  }
}

export async function fetchDirectories() {
  try {
    const response = await axios.get('/api/directories')
    return response.data
  } catch (error) {
    throw Error(error)
  }
}



export default {
  fetchAccounts,
  fetchCosts,
  addCost,
  fetchIncomes,
  addIncomes,
  fetchDirectories,
}
