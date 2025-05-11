import { Routes, Route } from 'react-router'
import LandingPage from './app/pages/LandingPage'
import './reusable_component_styles.css'
import AuthRoute from './utility/AuthRouter'
import HomePage from './app/pages/HomePage'
import SignUpPage from './app/pages/Signup'
import LoginPage from './app/pages/login'

export default function App() {

  return (
    <Routes>
      <Route index element={<AuthRoute><HomePage/></AuthRoute>}/>
      <Route path='/landingpage' element={<LandingPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/homepage' element={<HomePage/>}/>
    </Routes>
  )
}