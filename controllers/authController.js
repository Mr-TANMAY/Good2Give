const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async(req, res) => {
    try {
        const existingUser = await userModel.findOne({email : req.body.email});

        // Check if user already exists with same email address, then throw error message to client side.

        if(existingUser){
            return res.status(400).send({
                success : false,
                message: 'User already exists with same email address.',
            })
        }
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword;

        //rest data  to user model and save the data into database.
        const user = new userModel(req.body);
        await user.save();
        return  res.status(201).send({ 
            success : true, 
            message: 'User registered successfully.',
            user,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: 'Error in Register API',
            error
        })
    }
};

//LOGIN controller to login the user into system and return token for authentication of user.

const loginController = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Email Address or Password.',
        });
      }
  
      // Check if the role matches
      if (user.role !== role) {
        return res.status(403).send({
          success: false,
          message: 'Invalid role. Please select the correct role.',
        });
      }
  
      // Compare password with hashed password
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Email Address or Password.',
        });
      }
  
      // Generate a token for the user
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).send({
        success: true,
        message: 'User logged into system successfully.',
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error in Login API',
        error,
      });
    }
  };
  

//get current user  data from database and return to client side.
const currentUserController = async(req, res)=>{
    try {
        const user = await userModel.findOne({_id : req.user.userId});
        return res.status(200).send({
            success : true, 
            message : 'Current User Data Returned Successfully.', 
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : 'Unable to get current user',
            error,
        })
        
    }

};

module.exports = {registerController, loginController, currentUserController};

