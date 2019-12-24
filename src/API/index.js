import axios from 'axios'

export async function fetchAccounts() {
  try {
    const response = await axios.get('/api/accounts')
    return response.data
  } catch (error) {
    throw Error(error)
  }
}

export async function fetchCosts(type) {
  try {
    const response = await axios.get(`/api/costs/${type}`)
    return response.data
  } catch (error) {
    throw Error(error)
  }
}

export async function addCost(cost, type) {
  try {
    const response = await axios.post(`/api/costs/${type}/add`, cost)
    return response.data.costs
  } catch (error) {
    throw Error(error)
  }
}

export async function deleteCost(id, type) {
  try {
    const response = await axios.post(`/api/costs/${type}/delete`, { id })
    return response.data.costs
  } catch (error) {
    throw Error(error)
  }
}

export async function fetchIncomes(type) {
  try {
    const response = await axios.get(`/api/incomes/${type}`)
    return response.data
  } catch (error) {
    throw Error(error)
  }
}

export async function addIncome(income, type) {
  try {
    const response = await axios.post(`/api/incomes/${type}/add`, income)
    return response.data.incomes
  } catch (error) {
    throw Error(error)
  }
}

export async function deleteIncome(id, type) {
  try {
    const response = await axios.post(`/api/incomes/${type}/delete`, { id })
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
