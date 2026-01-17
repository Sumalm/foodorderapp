import { React } from 'react'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import Home from './Screen/Home/Home'
import Cart from './Screen/Cart/Cart'
import PlaceOrder from './Screen/PlaceOrder/PlaceOrder'
import { Footer } from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import { useState } from 'react'
import Verify from './screen/Verify/Verify'
import MyOrders from './screen/MyOrders/MyOrders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App= () => {
  const [showLogin, setShowLogin] = useState(false)
  return(
    <>
    {
       showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>
    }
    <div className='app'>

    <ToastContainer/>
      <NavBar setShowLogin={setShowLogin}/> 
      <Routes>       
        <Route index element= {<Home/>} /> 
        <Route path='/cart' element= {<Cart/>} />
        <Route path='/order' element= {<PlaceOrder/>} />
        <Route path='/Verify' element= {<Verify/>} />
        <Route path='/MyOrders' element= {<MyOrders/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
  
}

export default App
