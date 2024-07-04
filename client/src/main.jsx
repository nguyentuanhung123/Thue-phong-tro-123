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
