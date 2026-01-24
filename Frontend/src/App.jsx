import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
export default function App() {
  return (
    <>
    <Router>


    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      {/* <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/> */}
    </Routes>
    </Router>
    </>
  )
}
