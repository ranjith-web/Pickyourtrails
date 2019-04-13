const travels = (state = {}, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'FETCH_TRAVELS':
            return {
                ...state,
                payload
            }
        default:
            return state
    }
  }
  
  export default travels;