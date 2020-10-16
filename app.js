const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path = require('path');
const mysql=require('mysql');
var employee=require('./routes/employee');
var login=require('./routes/login');
var placeOrder=require('./routes/placeOrder');
var order=require('./routes/order');
const passport=require('passport');
var session=require("express-session");
var cookieParser=require("cookie-parser");
const mysqlConnection=require("./connections");
const routes=require("./routes/products");

app.set('view engine','ejs');
app.set('views', path.join(__dirname, './public/views'));

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret:"supernova",saveUninitialized:true,resave:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/product",routes);

var checkLog=function(req,res,next){

	if(req.user){
		next();
		console.log(req.user,"inside checkLog");
	} else{
		res.redirect("/login");
	}
}



app.use('/',login);
app.use('/employees',employee);
app.use('/order',placeOrder);
app.use('/order',order);


app.listen(8000,function(){
	console.log("server is responding on port 8000");
})
