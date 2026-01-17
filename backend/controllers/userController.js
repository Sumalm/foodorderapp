const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const createToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_TOKEN_SECRET
    )
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body
    
    try{
        const user = await userModel.findOne({email})
        if(!user)
            return res.status(400).json({success:false,message:"Invalid email or password"})
            const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json({success:false,message:"Invalid email or password"})
        const token = createToken(user._id)
        res.status(200).json({success:true,token})

    }catch(error){
        
    }
}
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });

        if (exists) {
            console.log('Email already exists');
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        if (!validator.isEmail(email)) {
            console.log('Invalid email');
            return res.status(400).json({ success: false, message: "Invalid Email" });
        }

        if (password.length < 6) {
            console.log('Password too short');
            return res.status(400).json({ success: false, message: "Password should be at least 6 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashedPassword });
        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { loginUser, registerUser }