# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Video 1: Cài thêm redux : 

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
- B3: Tạo filer redux.jsx (cùng cấp với main.jsx)
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

```jsx
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// add redux
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import reduxStore from './redux.jsx'

const { store, persistor } = reduxStore()

/**
 * Bọc con App trong PersistGate, nó giúp con react delay việc render UI cho tới store được update
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
)
```

### Video 2: Tải thêm thư viện 

- npm i thunk axios react-router-dom react-icons

- thunk: xử lý bất đồng bộ giữa react và redux

### Tạo folder tên public và system trong containers

- public: chứa các trang muốn hiển thị cho người dùng mà không cần đăng nhập

- system: chứa các trang có tài khoản mới vào được

### Tạo Router

- B1: Ở main.jsx, bọc App trong BrowserRouter

```jsx
// browser router
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
)
```

- B2: Trong App.jsx, thêm Routes, Route

```jsx
import { Routes, Route } from 'react-router-dom'

// page
import { Home, Login } from './containers/public'

// path
import { path } from './utils/constant.jsx'

const App = () => {
  return (
    <h1 className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}/>
        <Route path={path.LOGIN} element={<Login />}/>
      </Routes>
    </h1>
  )
}
```

- B3: Tạo file index.jsx trong thư mục public
```jsx
export { default as Header } from './Header.jsx'
export { default as Login } from './Login.jsx'
export { default as Home} from './Home.jsx'
```

- B4: Tạo file constant.jsx trong utils để lưu đường dẫn để sau này muốn sửa thì sẽ đồng bộ hết
```jsx
export const path = {
    HOME: '/*',
    LOGIN: '/login'
}
```

### Xóa background trong ảnh đã cắt
- B1: Cắt ảnh
- B2: Vào link https://www.remove.bg/upload (gõ: bg remove)

### object-fit

- cover: Không ưu tiên về ảnh (ảnh có thể bị mất), phân giải đúng kích thước
- contain: Ưu tiên về ảnh (ảnh không bị mất) , không ưu tiên  kích thước

### Lưu ý khi import 

- Ở Home.jsx để import Header cùng cấp ta phải để:

```jsx
import Header from './Header.jsx'
```

- Ở App.jsx để import Home, Login ở folder khác ta phải để:

```jsx
import { Home, Login } from './containers/public'
```

### useCallback

- useCallback là một hook trong React giúp bạn tạo ra một hàm đã được "memoized" (ghi nhớ lại) để tối ưu hóa hiệu suất của component. Có một số lý do chính để sử dụng useCallback:

# Tối ưu hóa hiệu suất:
- Khi một component re-renders, mọi hàm bên trong nó sẽ được tạo lại. Điều này có thể gây ra vấn đề về hiệu suất nếu các hàm này được truyền xuống các component con thông qua props. Khi đó, các component con cũng sẽ re-render không cần thiết.
- useCallback giúp bạn lưu lại phiên bản của hàm từ lần render trước nếu các dependency không thay đổi, giúp tránh việc tạo lại hàm mới không cần thiết.

# Tránh re-render không cần thiết của các component con:
- Nếu bạn truyền một hàm vào một component con như một prop, và hàm này thay đổi ở mỗi lần render của component cha, component con sẽ re-render mỗi khi hàm này thay đổi.
- Sử dụng useCallback để memoize hàm giúp đảm bảo rằng component con chỉ re-render khi các dependency thực sự thay đổi.

# Tương thích với các hook khác như useEffect:
- Trong useEffect, nếu bạn sử dụng một hàm mà không memoize, mỗi lần render mới sẽ tạo ra một phiên bản hàm mới, khiến useEffect chạy lại mỗi lần render. Sử dụng useCallback giúp tránh việc này.

- Đoạn mã của bạn đã sử dụng useCallback đúng cách bằng cách thêm một dependency array rỗng []. Điều này đảm bảo rằng hàm goLogin sẽ không thay đổi sau lần render đầu tiên.

```jsx
const goLogin = useCallback(() => {
  navigate(path.LOGIN);
}, []); // dependency array rỗng
```

### Trong React, việc sử dụng memo có thể giúp tối ưu hóa hiệu suất của ứng dụng bằng cách giảm số lần re-render không cần thiết của các component. Dưới đây là những lý do cụ thể tại sao cần sử dụng memo trong React:

## 1. Tối ưu hóa hiệu suất:

- Khi một component nhận props từ component cha, nếu các props này không thay đổi, component con không cần thiết phải re-render. memo giúp ngăn chặn việc re-render không cần thiết này.

- Điều này đặc biệt quan trọng đối với các component con phức tạp hoặc nặng về tính toán, vì việc re-render không cần thiết có thể làm chậm ứng dụng.

## 2. Tiết kiệm tài nguyên:

- Giảm số lần re-render không chỉ tiết kiệm thời gian mà còn tiết kiệm tài nguyên hệ thống (CPU, bộ nhớ).

### 3. Giữ cho UI mượt mà hơn:

- Tránh các re-render không cần thiết giúp giữ cho giao diện người dùng mượt mà và phản hồi nhanh hơn, cải thiện trải nghiệm người dùng.

### Khi nào nên sử dụng memo

- Component con không thay đổi props thường xuyên: Nếu một component con nhận props mà không thay đổi thường xuyên, memo có thể giúp tránh các re-render không cần thiết.

- Component nặng về tính toán: Nếu component cần nhiều tính toán để render, việc tránh các re-render không cần thiết sẽ cải thiện hiệu suất đáng kể.

- Component tái sử dụng nhiều lần: Nếu một component được tái sử dụng nhiều lần trong ứng dụng, việc sử dụng memo có thể giúp giảm tải việc re-render.

### Khi nào không cần sử dụng memo

- Component đơn giản: Nếu component rất đơn giản và re-render không gây ảnh hưởng đáng kể đến hiệu suất, việc sử dụng memo có thể không cần thiết.

- Props thay đổi thường xuyên: Nếu các props của component thay đổi thường xuyên, việc sử dụng memo có thể không mang lại lợi ích rõ rệt và thậm chí có thể gây thêm phức tạp không cần thiết.

- Tóm lại, memo là một công cụ hữu ích trong React để tối ưu hóa hiệu suất bằng cách giảm số lần re-render không cần thiết, nhưng cần được sử dụng đúng cách và trong đúng ngữ cảnh để đạt hiệu quả tốt nhất.


```jsx
const Button = ({ text, textColor, bgColor, IcAfter, onClick }) => {
    console.log("re-render on button");
    return (
        <button 
            type="button" 
            className={`p-2 ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
            onClick={onClick}
        >
            <span>{text}</span>
            <span>{IcAfter && <IcAfter />}</span>
        </button>
    );
}
```

## Sử dụng memo để bọc component Button, giúp React chỉ re-render component này khi các props thay đổi.

## Lợi ích của memo

- Như đã đề cập, việc sử dụng memo giúp tối ưu hóa hiệu suất bằng cách tránh các re-render không cần thiết. Điều này đặc biệt quan trọng đối với các component như Button, nơi mà có thể được sử dụng nhiều lần trong một ứng dụng và có thể gây ra nhiều re-render không cần thiết nếu không được tối ưu hóa.

### Giải quyết vấn đề

- Khi bấm vào trang Login ta thấy ở Login vẫn còn Header => ta xử lý bằng cách đặt Login bên trong Home

- B1: Sửa lại Login và đặt nó trong Home ở App.jsx

```jsx
const App = () => {
  return (
    <h1 className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />}/>
        </Route>
      </Routes>
    </h1>
  )
}

export default App
```

- B2: Xóa dấu gạch / ở login

```jsx
export const path = {
    HOME: '/*',
    LOGIN: 'login'
}
```

- B3: Thêm Oulet ở Home.jsx

```jsx
const Home = () => {
    return (
        <div className='w-1100 m-auto h-full border border-red-500'>
            <Header />
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home
```

### Lưu ý khi sử dụng flex-col: Khi ta để cha là flex-col các component con sẽ bị ép lại phù hợp với nội dung trong nó, ở Navigation ta để w-[40px] nhưng do ảnh hưởng của flex-col nên bị ép xuống còn 24px




