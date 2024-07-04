/**
 * ở rootReducer, sẽ cấu hình persist cho các reducer. Redux-persist giúp mình có thể tùy chọn lưu hoặc không lưu
 * state nào của reducer dưới localStorage mà không cần phải thủ công
 * 
 * persist: giữ lại
 * persistReducer tức là giữ lại giá trị của reducer lại vì reducer khi re-load lại trang sẽ trở về giá trị ban đầu
 * 
 * whitelist để chọn ra những state nào của reducer được lưu ở localStorage,
 * blacklist thì chọn ra state nào của reducer không lưu ở localStorage.
 * Nếu trong config không để whitelist hoặc blacklist thì mặc định nó sẽ lưu hết state của reducer đó dưới localStorage luôn
 * 
 * reducer nào muốn persist thì bọc nó trong hàm persistReducer cùng với config không thì khỏi
 */

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLogged', 'token']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer
})

export default rootReducer;