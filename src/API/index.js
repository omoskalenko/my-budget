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

export async function deleteIncome(id, type, refId) {
  try {
    const response = await axios.post(`/api/incomes/${type}/delete`, { id, refId })
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

export async function commitTransaction(date, transaction, target) {
  try {
    const response = await axios.post('/api/commit', { date, transaction, target })
    return response.data[target.type]
  } catch (error) {
    throw Error(error)
  }
}

export async function bindTransaction(data, target) {
  try {
    const response = await axios.post('/api/bind', { data, target })
    return response.data
  } catch (error) {
    throw Error(error)
  }
}

export async function skipTransaction({ id, date, type }) {
  try {
    const response = await axios.post('/api/skip', { id, date, type })
    return response.data[type]
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
  commitTransaction,
  bindTransaction,
  skipTransaction,
}
