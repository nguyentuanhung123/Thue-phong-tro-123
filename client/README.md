# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Cài thêm redux : 

- npm i redux react-redux redux-persist

### Tác dụng của các folder :

- utils: chứa các data
- services: gọi api
- store: redux

### Thiết lập redux và redux persist để lưu giữ state của reducer lên localStorage

- B1: Tạo 1 folder store chứa 2 folder con là actions và reducers
- B2: Trong folder reducers tạo 3 file: authReducer, userReducer và rootReducer
```jsx
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
```
- B3: Tạo filer redux.jsx (cùng caaos với main.jsx)
```jsx
import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist"; // có nhiệm vụ giữ lại state
import { createStore } from "redux"; // tạo 1 store

const reduxStore = () => {
    const store = createStore(rootReducer)
    const persistor = persistStore(store)

    return { store, persistor }
}

export default reduxStore;
```
- B4: Ở main.jsx, chỉnh sửa


