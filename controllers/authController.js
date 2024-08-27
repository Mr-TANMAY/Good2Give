const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerController = async(req, res) => {
    try {
        const existingUser = await userModel.findOne({email : req.body.email});

        // Check if user already exists with same email address, then throw error message to client side.

        if(existingUser){
            return res.status(200).send({
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

module.exports = {registerController};

