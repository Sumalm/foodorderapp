const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.SK_SECRET);

// ================= PLACE ORDER =================
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    // Create order in DB
    const newOrder = await orderModel.create({
      userId,
      items,
      amount,
      address,
      payment: false,
      status: "Food Processing",
      date: Date.now()
    });

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Stripe line items (products)
    const line_items = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 // price in paise
      },
      quantity: item.quantity
    }));

    // ✅ FIXED: Delivery charge (minimum ₹50 for Stripe)
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: "Delivery Charge"
        },
        unit_amount: 5000 // ₹50 (Stripe minimum-safe)
      },
      quantity: 1
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({
      success: true,
      session_url: session.url
    });

  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= VERIFY ORDER =================
const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.status(500).json({ success: false, message: "Verification error" });
  }
};

// ================= USER ORDERS =================
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// ================= LIST ALL ORDERS (ADMIN) =================
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Cannot fetch orders" });
  }
};

// ================= UPDATE ORDER STATUS =================
const updateState = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Status update failed" });
  }
};

module.exports = {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateState
};
