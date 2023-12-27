
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import CheckoutPage from './components/CheckoutPage';

const App=()=> {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path = "/signup" element={<SignUpPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
          <Route path='/Dashboard' element={<DashboardPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
