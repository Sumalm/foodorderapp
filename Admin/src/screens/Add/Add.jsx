import axios from 'axios'
import React, { useState } from 'react'
import { assets } from '../../assets/admin_assets/assets'
import './Add.css'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false)
  const [data,setData] = useState({
    name:'',
    description:"",
    price:"",
    category:"Salad",
  })
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData({...data, [name]: value})
  }
  const onSubmitHandler = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('category', data.category)
    const response = await axios.post(`${url}/api/food/add`,formData)
    console.log(response.data)
    if(response.data.success){
      setData({
        name :'',
        description:'',
        price:'',
        category:''
      })
      setImage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }
  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className='flex-col' >
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image) : assets.upload_area} alt="" sizes="" srcset="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file"  id='image' hidden required/>
        </div>
        <div className="add-product-name">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder="Enter Product Name" required/>
        </div>
        <div className="add-product-description">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' placeholder="Enter Product Description" required rows="6"></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name='category'>
              <option value="Salad">Salad</option>
              <option value="Dessert">Dessert</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pizza">Pizza</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Rice">Rice</option>
              <option value="Curry">Curry</option>
              <option value="Soup">Soup</option>
              <option value="Bread">Bread</option>
              <option value="Biscuit">Biscuit</option>
              <option value="Cookies">Cookies</option>
              <option value="Tea">Tea</option>
              <option value="Coffee">Coffee</option>
              <option value="Juice">Juice</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="add-price">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} name='price' type="number" placeholder="Enter Product Price" required/>
          </div>
        </div>
        <div className="add-product-submit">
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
    
  )
      
}

export default Add