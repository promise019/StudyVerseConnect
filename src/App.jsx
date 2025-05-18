import { Routes, Route } from 'react-router'
import LandingPage from './app/pages/LandingPage'
import './reusable_component_styles.css'
import AuthRoute from './utility/AuthRouter'
import HomePage from './app/pages/HomePage'
import SignUpPage from './app/pages/Signup'
import LoginPage from './app/pages/login'
import Find_buddies from './app/pages/layout/Find_Buddies'
import AI_Tutor from './app/pages/layout/AI_tutor'
import Friends from './app/pages/layout/Friends_List'
import Group_Lists from './app/pages/layout/Group_List'
import AboutStudyVerse from './app/pages/layout/About'

export default function App() {

  return (
    <div className='lightmode h-screen'>
      <Routes>
      <Route index element={<AuthRoute><HomePage/></AuthRoute>}/>
      <Route path='/landingpage' element={<LandingPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/homepage' element={<HomePage/>}>
          <Route path='' element={<AboutStudyVerse/>}/>
          <Route path='buddies' element={<Find_buddies/>}/>
          <Route path='Ai_tutor' element={<AI_Tutor/>}/>
          <Route path='friend_lists' element={<Friends/>}/>
          <Route path='groups' element={<Group_Lists/>}/>
      </Route>
    </Routes>
    </div>
  )
}