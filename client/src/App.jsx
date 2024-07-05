import { Routes, Route } from 'react-router-dom'

// page
import { Home, Login } from './containers/public'

// path
import { path } from './utils/constant.jsx'

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