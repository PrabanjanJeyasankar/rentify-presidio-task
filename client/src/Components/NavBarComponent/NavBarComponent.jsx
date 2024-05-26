import React, { useState } from 'react'
import './NavBarComponent.css'
import { TbSmartHome } from 'react-icons/tb'
import SignUpComponent from '../SignUpComponent/SignUpComponent'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import HomeComponent from '../HeaderComponent/HeaderComponent'
import LoginComponent from '../LoginComponent/LoginComponent'
import RenderResultsComponent from '../RenderResultsComponent/RenderResultsComponent'
import SellerComponent from '../SellerComponent/SellerComponent'

function NavBarComponent() {
  const [showSignUp, setShowSignUp] = useState(false)

  const handleSignInClick = () => {
    setShowSignUp(true)
  }

  return (
    <Router>
      <div className='nav-container'>
        <div className='navbar'>
          <div className='app_logo'>
            <TbSmartHome className='app_logo_icon' size={28} />
            <span className='app_title'>Rentify</span>
          </div>
          <div className='nav_pages'>
            <ul>
              <Link to='/'>Home</Link>
              <Link to='/about'>About us</Link>
              <Link to='/sell-property'>Sell Property</Link>
            </ul>
          </div>
          <div className='register_user'>
            <Link className='log_in_btn' to='/login'>Log in</Link>
            <Link className='sign_in_btn' to='/signup'>Sign up</Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<HomeComponent />}></Route>
        <Route path='/signup' element={<SignUpComponent />}></Route>
        <Route path='/login' element={<LoginComponent />}></Route>
        <Route path='/result' element={<RenderResultsComponent/>}></Route>
        <Route path='/sell-property' element={<SellerComponent/>}></Route>
      </Routes>
    </Router>
  )
}

export default NavBarComponent
