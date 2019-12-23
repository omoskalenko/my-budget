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
    return response.data.costs
  } catch (error) {
    throw Error(error)
  }
}

export async function deleteCost(id) {
  try {
    const response = await axios.post('/api/costs/delete', { id })
    return response.data.costs
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

export async function addIncome(cost) {
  try {
    const response = await axios.post('/api/incomes/add', cost)
    return response.data.incomes
  } catch (error) {
    throw Error(error)
  }
}

export async function deleteIncome(id) {
  try {
    const response = await axios.post('/api/incomes/delete', { id })
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
  deleteCost,
  fetchIncomes,
  addIncome,
  deleteIncome,
  fetchDirectories,
}
