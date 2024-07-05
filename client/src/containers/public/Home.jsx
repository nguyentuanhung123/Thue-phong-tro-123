import Header from './Header.jsx'

// router
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation.jsx'

const Home = () => {
    return (
        <div className='w-full h-full flex flex-col items-center'>
            <Header />
            <Navigation />
            <div className='w-1100 flex flex-col items-center justify-start mt-3'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home
