const express = require('express');
const connectDB = require('./config/dbConn')
const foodRouter = require('./routes/foodRoute')
const corsOptions = require('./config/corsOptions')
const cors = require("cors");
//app config
const app = express();
require ('dotenv').config()
app.use(cors(corsOptions));
const port = 4000

//middleware
app.use(express.json())
//connect to db
connectDB()

// routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")) 
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/cart",require("./routes/cartRoute")) 
app.use("/api/order",require("./routes/orderRoute"))

app.get('/',(req,res)=>{
    res.send('Hello Kitty.....*')
})

app.listen(port,()=>{    
    console.log(`Server running on http://localhost:${port}`)
})
