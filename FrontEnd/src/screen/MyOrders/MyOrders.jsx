import { useState, useContext, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {

  const [data, setData] = useState([])
  const { url, token } = useContext(StoreContext)

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userOrders",   // ✅ FIXED
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setData(response.data.data)
      }
    } catch (error) {
      console.log("MY ORDERS ERROR:", error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])   // ✅ FIXED

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {data.map((order) => (
          <div key={order._id} className="my-orders-order"> {/* ✅ FIXED */}
            <img src={assets.parcel_icon} alt="" />

            <p>
              {order.items.map((item, index) =>
                `${item.name} x ${item.quantity}${index !== order.items.length - 1 ? ", " : ""}`
              )}
            </p>

            <p>₹{order.amount}</p>
            <p>Items: {order.items.length}</p>

            <p>
              <span>Status:</span> {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
