const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
		type: String,
		required: true,
		min: [3, "Invalid lastname passed"],
        validate: {
            validator: (lastName)=> {
                if(lastName.lenght > 3) {
                    return true;
                } else {
                    return false;
                }
            },
            message: props=> `${props.value} is an invalid lastName`
        }
	},
    password: { 
		type: String, 
		required: true,
		validate: {
            validator: (password)=>{
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
            },
            message: props => `${props.value} is not a valid password. Please use a valid password.`
        }
	}, 
	email: { 
		type: String,
		required: true,
		validate: {
            validator: (email) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: props => `${props.value} is not a valid email. Please use a valid email.`
        }
	},
    phone_number: { 
		type: String,
		required: true 
	}, 
	photo: { 
		type: String,
		required: false 
	},
    role: { 
		type: String, 
		required: true 
	},
	verified:{
		type:Boolean,
		required:false
	},
	created:{
		type:Date,
		required:true
	},
	photo:{
		type:String,
		required:false
	},
	pancard:{
		type:String,
		required:false
	},
	category: {
		type: String,
		required:false
	},
	subcategory:[Schema.Types.Mixed],
	createdOn : {
		type: Date,
		default: Date.now(),
		required: true
	}
});

module.exports = mongoose.model('users', userSchema);


   