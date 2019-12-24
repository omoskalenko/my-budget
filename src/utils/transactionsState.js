export const fetchTransactionsRequest = (state, { payload }) => ({
  ...state,
  list: [],
  isFetching: true

})
export const fetchTransactionsSuccess = (state, { payload }) => ({
  ...state,
  list: payload,
  isFetching: false
})

export const addTransactionRequest = (state, { payload }) => ({
  ...state,
  isFetching: true,
  isSubmit: false,
})

export const addTransactionSuccess = (state, { payload }) => ({
  ...state,
  list: payload,
  isFetching: false,
  isSubmit: true
})

export const deleteTransactionRequest = (state, { payload }) => ({
  ...state,
  deleting: {
    ...state.deleting,
    [payload]: true
  },
})

export const deleteTransactionSuccess = (state, { payload, id }) => ({
  ...state,
  list: payload,
  deleting: {
    ...state.deleting,
    [id]: false
  },
})

export const error = (state, { payload }) => ({
  ...state,
  error: true,
  isFetching: false,
  deleting: false,
})
