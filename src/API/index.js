import data from '../struct'

export function getAllData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), 100)
  })
}

export function getAccounts() {
  return new Promise(resolve => {
    setTimeout(() => resolve(data.accounts), 1000)
  })
}
