import React from 'react'
import './FoodItemCard.css' 
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'

const FoodItemCard = ({id,name,price,image,description}) => {

  const {cartItem, setCartItem, addToCart, removeFromCart,url} = useContext(StoreContext)

  return (
    <div className="food-item-card">
        <div className="food-item-image-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
        {
          !cartItem[id]
          ?<img src={assets.add_icon_white} className="add" alt="addbtn" onClick={() => addToCart(id)}/>
          :<div className="food-item-counter">
            <img src={assets.remove_icon_red} alt="" onClick={() => removeFromCart(id)} />
             <p>{cartItem[id]}</p>
             <img src={assets.add_icon_green} alt="" onClick={() => addToCart(id)} />
          </div>
        }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="start" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>₹{price}</p>
        </div>
    </div>
  )
}

export default FoodItemCard