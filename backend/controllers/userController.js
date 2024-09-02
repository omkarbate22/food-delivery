import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from 'validator';

// Function to create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// login user
const loginUser = async (req, res) => {
   const { email, password } = req.body;
   try {
    const user = await userModel.findOne({email});

if(!user) 
    {
    return res.status(400).json({ success:false, message: "User not found" });
}

const isMatch  = await bcrypt.compare(password , user.password)

if(!isMatch){
    return res.json({sucess:false , message:"Invalid credentials"})
}

const token = createToken(user._id);
res.json({success:true, token})

   }

   catch(error){
   return res.status(500).json({ success:false, message: "Server error" });

   }

};
// Function to validate password
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,25})/;
    return passwordRegex.test(password);
};

// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Check if email contains "gmail.com"
        if (!email.endsWith("@gmail.com")) {
            return res.json({ success: false, message: "Only Gmail addresses are allowed" });
        }

        // Validate password
        if (!isValidPassword(password)) {
            return res.json({ success: false, message: "Password must be 8-25 characters long, contain at least one capital letter, and one special character" });
        }

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // Create JWT token
        const token = createToken(user._id);

        // Send success response
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser };