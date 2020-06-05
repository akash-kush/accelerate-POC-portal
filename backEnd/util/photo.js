var multer=require('multer');
var storage=multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'uploads/');
	}
});
const fileFilter=(req,file,cb)=>{
		if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='application/pdf'){
		cb(null,true);
		}
		else{
		cb(new Error('only jpeg,png and pdf file allowed'),false);
		}
	}; 
var upload=multer({storage:storage,limit:{
	filesize:1024*1024*2
},
fileFilter:fileFilter
});
module.exports=upload;