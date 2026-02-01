const initialState = ''

export const filterActionCreator = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

const reducer = (state = initialState, action) => {
  console.log('filter state now: ', state)
  console.log('filter action', action)

  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export default reducer