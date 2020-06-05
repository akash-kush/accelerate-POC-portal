var express=require('express');
var app=express();
var router=express.Router();
//var db=require('../dao/db.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose=require('mongoose');
var User=require('../model/User.js');
var upload=require('../util/photo.js');
var dotenv=require('dotenv');
dotenv.config();
var dburl=process.env.dburl;
console.log('dbname'+dburl);
const shortid = require('shortid');
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});
console.log('db connected');

//method for frontend logging
router.post('/log',(req,res)=>{
	const fs = require('fs');
	fs.appendFile('frontendLogger.txt',req.body.log + "\n", (err) => {
	  if (err) {
				console.log("logging request failed");
			   }	
	})
})

// method to register users
router.post('/users',upload.array('files'),function(req,res){
	console.log('request data for registration ',req.body);
	//console.log(req.files);
	var ar=req.files;
	var photo;
	var pancard;
	if(ar==undefined){
		console.log('.......cornor cases.....');
		photo:'';
		pancard:''
	}
	else{
		console.log('file is',req.files);
		console.log('not a corner case....');
		photo=ar[0]!=null?ar[0].path:'';
		 pancard=ar[1]!=null?ar[1].path:'';
	}
	
	// var idGenerate= function(){
	// 	randNum= Math.random().toString(20).substr(2, 6);
	// 	return "YOL"+randNum;
	// 	}

		// var photo=ar[0]!=null?ar[0].path:'';
	// var pancard=ar[1]!=null?ar[1].path:'';
    var UserObj=new User({name:req.body.name,password:req.body.password,email:req.body.email, id:shortid.generate(), 
	                phone_number:req.body.phone_number,photo:req.body.photo,role:req.body.role,
					verified:false,created:new Date(),photo:photo,pancard:pancard,category:req.body.category,subcategory:req.body.subcategory});
    UserObj.save(function(err,response){
        if(err){ res.json({status:500,message:err.message});
		console.log(err);
		}
		else{
			res.json({status:200,message: 'registered successfully'})
		}
	});
	
});

// method to login user
router.post('/login',function(req,res){
   console.log('user login '+req.body);
   User.find({email:req.body.email,password:req.body.password},{role:1},function(err,response){
	   
        if(response.length==0 ){
        res.json({ valid: false,status:500,data:[],message: 'Invalid credentials !'});
		console.log('login failed');
		}
		else{
			console.log('alooooooo');
			  res.json({ valid:true,status:200,data:response,message: 'success !'});
			  console.log('login success');
		}
   });
   
    });
	
// get all users
router.get('/users',function(req,res){
	User.find({},function(err,response){
		if(err){
			res.json({status:500,message:err.message});
			next(err)
		}
		else{
			res.json({status:200,response});
		}
	});
});
// get all users by role
router.get('/users/role/:role',function(req,res){
	User.find({role:req.params.role},function(err,response){
		if(err){
			res.json({status:500,message:err.message});
		}
		else{
			res.json({status:200,response});
		}
	});
});

// get all users by id
router.get('/users/:id',function(req,res,next){
	User.find({_id:req.params.id},function(err,response){
		if(err){
			err.status=500
			next(err)
		}
		else{
			res.json({status:200,response});
		}
	});
});

//update user
app.put('/users',function(req,res,next){
	id=req.body._id;
	newdata={name:req.body.name,phone_number:req.body.phone_number,photo:req.body.photo}
	User.findByIdAndUpdate({id},newdata,function(err,response){
		if(err){
			err.status=500
		    next(err)
		}
		else{
			res.json({status:200,message: 'updated successfully'})
		}
	});
});
// app.get('/provider/:location',function(req,res,nex){
// 	location=req.params.location
// 	User.find({$and:[{role:'P'},{location:location}]})
// })
  module.exports=router;