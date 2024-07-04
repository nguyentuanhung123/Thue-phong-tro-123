/**
 * 
 */

import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist"; // có nhiệm vụ giữ lại state
import { createStore } from "redux"; // tạo 1 store

const reduxStore = () => {
    const store = createStore(rootReducer)
    const persistor = persistStore(store)

    return { store, persistor }
}

export default reduxStore;