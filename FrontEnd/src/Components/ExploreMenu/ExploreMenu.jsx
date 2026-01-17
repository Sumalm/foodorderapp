import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/frontend_assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="Explore-Menu" id='Explore-Menu' >
        <h1>Explore Our Menu</h1>
        <p className='Explore-Menu-Text'>Choose from our wide range of cuisines and dishes.</p>
        <div className="Explore-Menu-List">
            {menu_list.map((item, index)=>{
            return(
                <div onClick={ () => setCategory (category=>category===item.menu_name?
                'All':item.menu_name)} key ={index} className="Explore-Menu-List-Item">

                    <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="Item" />
                    <p>{item.menu_name}</p>
                </div>
            )
            })}
        </div>
        <hr />
    </div>    
  )
  
}

export default ExploreMenu