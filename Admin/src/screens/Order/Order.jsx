import { useEffect, useState } from 'react'
import './Order.css'
import axios from "axios"
import { toast } from 'react-toastify'
import { assets } from '../../assets/admin_assets/assets'

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([])

  // ✅ FIX 1: USE POST (NOT GET)
  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/list")
      if (response.data.success) {
        setOrders(response.data.data)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch orders")
    }
  }

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value
    })
    if (response.data.success) {
      fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">

            <img src={assets.parcel_icon} alt="Parcel Icon" />

            <div>
              <p className="order-item-food">
                {order.items.map((item, index) =>
                  `${item.name} x ${item.quantity}${index !== order.items.length - 1 ? ", " : ""}`
                )}
              </p>

              {/* ✅ FIX 2: CORRECT ADDRESS FIELD NAMES */}
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>
                  {order.address.country} - {order.address.zipCode}
                </p>
              </div>

              <p className="order-item-phone">
                {order.address.phone}
              </p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
