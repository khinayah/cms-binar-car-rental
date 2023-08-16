const loginState = {
    token : "",
    error : null,
    loading : false
}

const loginReducer = (state = loginState, action) => {
    switch(action.type) {
        case "IS_LOAD" :
            return {
                ...state,
                loading: action.isLoading
            }
        case "IS_LOGGED_IN" :
            return {
                ...state,
                token: action.payload,
                loading: action.isLoading
            }
        case "IS_FAILED" : 
            return {
                ...state,
                error: action.payload,
                loading: action.isLoading
            }
            default:
                return state
    }
    
}

export default loginReducer