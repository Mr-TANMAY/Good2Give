const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    role: {
        type:String,
        required:[true,'Please add a role'],
        enum:['admin','organisation','user', 'hotels', 'shops' ]

    },

    name:{
        type:String,
        required: function(){
            if(this.role === 'user' || this.role === 'admin'){
                return true;
            }
            return false;
        }
    },
    
    organisationName:{
        type:String,
        required:function(){
            if(this.role === 'organisation'){
                return true;
            }
            return false;
        } 
    },

    hotelName:{
        type:String,
        required:function(){
            if(this.role === 'hotels'){
                return true;
            }
            return false;
        }
    },

    shops: {
        type:String,
        required:function(){
            if(this.role === 'shops'){
                return true;
            }
            return false;
        }
    },

    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true
    },
    password :{
        type:String,
        //encrypted password will be stored here
        required: [true,'Please add a password']
    },

    address:{ 
        type: String ,
        required:[true,"Please provide an address"]

    },

    phone: {
        type: Number ,
        required:[true,"Please provide a phone number"]
    }

},{timestamp: true});


module.exports = mongoose.model('User', userSchema);
