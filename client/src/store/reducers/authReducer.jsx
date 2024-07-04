/**
 * Xác thực
 * persist 2 giá trị dưới localStorage (persist: giữ lại)
 */

const initState = {
    isLogged: false,
    token: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {

        default:
            return state;
    }
}

export default authReducer;