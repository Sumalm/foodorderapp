import { useState, useContext } from 'react'
import './NavBar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const NavBar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState('home')
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()   // ✅ FIXED

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")                 // ✅ FIXED
  }

  return (
    <div className='NavBar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>

      <ul className="NavBar-menu">
        <Link to='/' className={menu === 'home' ? 'active' : ''} onClick={() => setMenu('home')}>Home</Link>
        <a href='#Explore-Menu' className={menu === 'menu' ? 'active' : ''} onClick={() => setMenu('menu')}>Menu</a>
        <a href='#footer' className={menu === 'contact-us' ? 'active' : ''} onClick={() => setMenu('contact-us')}>Contact-us</a>
      </ul>

      <div className="NavBar-right">
        <div className="NavBar-cart-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" /> Orders
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
