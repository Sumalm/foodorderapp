import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Cart = () => {

  const {
    food_list,
    cartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext)

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />

        {food_list.map((food) => {
          if (cartItem[food._id] > 0) {
            return (
              <React.Fragment key={food._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + food.image} alt="" />
                  <p>{food.name}</p>
                  <p>${food.price}</p>

                  <div className="quantity-counter">
                    <img
                      src={assets.remove_icon_red}
                      onClick={() => removeFromCart(food._id)}
                      alt=""
                    />
                    <p>{cartItem[food._id]}</p>
                    <img
                      src={assets.add_icon_green}
                      onClick={() => addToCart(food._id)}
                      alt=""
                    />
                  </div>

                  <p>${cartItem[food._id] * food.price}</p>
                </div>
                <hr />
              </React.Fragment>
            )
          }
          return null
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{getTotalCartAmount() === 0 ? 0 : 20}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <p>Total</p>
            <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</p>
          </div>
          <hr />

          <Link to="/order">
            <button>Proceed to Checkout</button>
          </Link>
        </div>

        <div className="cart-promocode">
          <p>If you have a promocode, enter it here.</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Enter Promocode" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
