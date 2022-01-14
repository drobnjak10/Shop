export const userReducer = (state, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            const user = action.payload
            return {
                ...state, user: user
            }
        case 'USER_INFO':
            const userInfo = action.payload;
            return {
                ...state, user: userInfo
            }
        default:
            return state;
    }
}

export const productReducer = (state = { loading: true, product: {}, error: false }, action) => {
    switch(action.type) {
        case 'ADD_NEW_PRODUCT':
            const product = action.payload;
            console.log(product);
            return {
                loading: false, product: action.payload
            };
        case 'ADD_PRODUCT_FAIL':
            return {
                loading: false, error: action.payload
            }
        default:
            return state;
    }
}