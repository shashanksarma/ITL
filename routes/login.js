const express=require('express');
const bodyParser=require('body-parser');
var cookieParser=require("cookie-parser");
const app=express();
const passport=require('passport');
var LocalStrategy=require("passport-local");
const mysql=require('mysql');
const jwt = require('jsonwebtoken');
var session=require("express-session");

const router=express.Router();

//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '1073147157772-l6okdf2nsaofhu63464aiulp8bbqchqb.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);
//

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


passport.serializeUser(function(user,done){
	console.log("serializing",user);
	done(null,user);
})

passport.deserializeUser(function(user,done){
	console.log("deserializing",user,"hiiiiiiiiiiiiiiii22222");
	done(null,user);
})



var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : "CarShowroom"

});


db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //let sql="CREATE TABLE Employee(emp_id varchar(6) Primary Key Check(emp_id like 'E%'),name varchar(30) not null,address varchar(30) not null,city varchar(30) not null,state varchar(20),dob DATE not null,joining_date DATE not null,salary int not null check(salary>0),phone_no int not null)";
  //let sql="CREATE TABLE orders(order_id varchar(6) Primary Key check(order_id like 'O%'),date_order DATE not  null,dely_date DATE check(dely_date>=date_order),car_id varchar(6),customer_id varchar(6),emp_id varchar(6),payment_id varchar(6) not null,extra_id varchar(6),Foreign Key (emp_id) References Employee(emp_id))";
  //let sql="INSERT INTO Employee VALUES('E00002','Bhushan','Dahisar','Mumbai','Maharashtra','2000-03-16','2017-03-16',150000,9324233439),('E00003','Vivek','Borivali','Mumbai','Maharashtra','2000-03-19','2019-03-16',300000,9324238438),('E00004','Vatsa','Mulund','Mumbai','Maharashtra','1970-09-11','2016-03-16',500000,9524233438),('E00005','Rohit Sharma','Borivali','Mumbai','Maharashtra','1988-04-30','2016-03-16',800000,8324233438),('E00006','Virat Kohli','Delhi','Delhi','Delhi','1989-11-05','2016-03-16',900000,9324733438),('E00008','KL Rahul','Malad','Mumbai','Maharashtra','1994-03-16','2016-03-16',700000,9624233438),('E00009','MS Dhoni','Malad','Ranchi','Bihar','1982-03-16','2000-03-16',900000,9924233438),('E00010','Jasprit Bumrah','Malad','Mumbai','Maharashtra','1995-03-16','2010-07-09',800000,9124233438)";
 //let sql="INSERT INTO Orders VALUES('O00002','2020-04-16','2020-06-12','C00002','010207','E00001','P00002','EX0002'),('O00003','2020-05-16','2020-06-19','C00003','010208','E00001','P00003','EX0003'),('O00004','2020-05-17','2020-06-12','C00004','010208','E00001','P00004','EX0005'),('O00005','2020-04-16','2020-06-12','C00002','010207','E00007','P00007','EX0004'),('O00006','2020-04-16','2020-06-12','C00004','010209','E00007','P00008','EX0004'),('O00007','2020-05-16','2020-07-12','C00006','010210','E00007','P00009','EX0014'),('O00008','2020-05-16','2020-07-12','C00006','010210','E00004','P00010','EX0014'),('O00009','2020-05-16','2020-07-12','C00008','010211','E00004','P00011','EX0013'),('O00010','2020-06-16','2020-08-12','C00009','010212','E00004','P00012','EX0013'),('O00011','2020-06-16','2020-08-12','C00010','010211','E00003','P00014','EX0015'),('O00012','2020-06-16','2020-08-12','C00011','010211','E00003','P00015','EX0016'),('O00013','2020-07-16','2020-08-16','C00012','010215','E00003','P00016','EX0015')";
  //let sql="SELECT *FROM Orders";
  //let sql ="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee,Orders  where Employee.emp_id=Orders.emp_id GROUP BY Orders.emp_id";
  //let sql="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee,Orders  where Employee.emp_id=Orders.emp_id  AND (Orders.emp_id =(SELECT Employee.emp_id FROM Employee,Orders where Employee.emp_id=Orders.emp_id  AND YEAR(Orders.dely_date)=('2020') GROUP BY Orders.emp_id order by COUNT(Orders.emp_id) desc LIMIT 1) OR Orders.emp_id =( SELECT emp_id FROM Employee where emp_id='E00004') OR Orders.emp_id= (SELECT emp_id FROM Employee where name='Param Patil'))GROUP BY Orders.emp_id ";
  //let sql="SELECT YEAR(dely_date) AS YEAR FROM Orders GROUP BY YEAR(dely_date)";
  //let sql="SELECT YEAR(joining_date) AS YEAR FROM Employee GROUP BY YEAR(joining_date)";
  //let sql ="SELECT   Employee.emp_id,Employee.salary FROM Employee,Orders where Employee.emp_id=Orders.emp_id AND Employee.salary=300000 GROUP BY Employee.emp_id ";
  //let sql="CREATE TABLE perSign(emp_id varchar(6),password varchar(20))";
  //let sql="CREATE TABLE tempSign(emp_id varchar(6))";
  //let sql="INSERT INTO tempSign VALUES('E00001'),('E00003'),('E00004'),('E00007')";
  //let sql='SELECT COUNT(Orders.car_id) as car_count,car_details.model_no FROM Orders LEFT JOIN car_details on car_details.car_id=Orders.car_id GROUP BY Orders.car_id order by car_count desc LIMIT 4';
  let sql="DESC car_details";
  db.query(sql,function(err,result){
		if(err) throw err;
		// console.log(result);
		
	});


});

passport.use("local-sigin",new LocalStrategy({passReqToCallback:true},
	function(req,username,password,done){
		let presentSignIn=false
		console.log(username,password);
		let sql="SELECT *FROM perSign where emp_id='"+username+"'";
		db.query(sql,function(err,result){

			if(result.length>0&&result[0].password==password){

				done(null,{username:username,password:password});			

			} else{
				done(null,false);
			}

		})

			
	}
));

passport.use("local-signUp",new LocalStrategy({passReqToCallback:true},
	function(req,username,password,done){

		console.log(username,password);
		console.log("BRUHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhhhhh");
		let sql="SELECT emp_id FROM perSign where emp_id='"+"E00002"+"'"; // username
		db.query(sql,function(err,result){

			if(err) throw err;
			console.log(result);
			console.log(sql)

			if(result.length){

				console.log("already exists");
				done(null,false);

			} else{

				let sql1="SELECT emp_id FROM tempSign where emp_id='"+username+"'";
				db.query(sql1,function(err,result1){

					if(err) throw done(null,false);
					console.log(sql1,result1);

					if(result1.length){
						let sql2="INSERT INTO perSign VALUES('"+username+"','"+password+"')";
						db.query(sql2,function(err,result2){

							if(err) throw err;
							console.log(result2);
							console.log(sql2)
							let sql3="DELETE FROM tempSign where emp_id='"+username+"'";
							db.query(sql3,function(err,result3){
								if(err) throw err;
								console.log("deleted from tempSign");
								console.log(sql3);
								done(null,{username:username,password:password});

							})


						})

					} else{
						console.log("does not have access");
						done(null,false);

					}

				})

			}



		})



	}))


router.get("/home",function(req,res){

	console.log("user visiting home page");
	//let sql='SELECT COUNT(car_id) as car_count,model_no FROM Orders LEFT JOIN car_details on car_id=order_id GROUP BY car_id order by car_count desc LIMIT 4';
	let sql='SELECT COUNT(Orders.car_id) as car_count,car_details.model_no FROM Orders LEFT JOIN car_details on car_details.car_id=Orders.car_id GROUP BY Orders.car_id order by car_count desc LIMIT 4';
	  db.query(sql,function(err,result){
			if(err) throw err;
			console.log(result);

	  		let sql1="SELECT COUNT(MONTH(dely_date)) as sell_count,MONTH(dely_date) as month FROM Orders where dely_date>=now() - INTERVAL 5 MONTH GROUP BY MONTH(dely_date)"

			db.query(sql1,function(err,result1){

				if(err) throw err;
				console.log(result1);

				res.render("home",{orderData:result1,carData:result});

			})
			
	});

})



//////////////MAPP

router.get("/map", function(req,res){
	res.render("map");
})

/////////////



router.get("/login",function(req,res){

	console.log(req.query.condition);
	res.render("index",{condition:req.query.condition});

});


router.get("/signUp",function(req,res){

	console.log("new User Signing in");
	console.log(req.query.condition);
	res.render("indexSignUp",{condition:req.query.condition});

});

router.post("/signUp",passport.authenticate('local-signUp',{
	successRedirect:"/employees",
	failureRedirect:"/signUp?condition=emp-id already exists or you don't have access"
}))

let googleSignIn = function(req,res,next){
	let token = req.body.token;
	console.log(token, "DHSAUOIHDASUODUIO");

	async function verify() {
	  const ticket = await client.verifyIdToken({
	  	idToken: token,
	  	audience: CLIENT_ID, 
	  });
	  const payload = ticket.getPayload();
	  const userid = payload['sub'];
	  console.log(payload);
	}
	verify().
	// then(()=>{
	// 	res.cookie('session-token', token);
	// 	res.send('success');
	// }).
	catch(console.error);
	next();
}

// var refreshTokens = [];

// router.delete("/logout", (req,res) => {
// 	refreshTokens = refreshTokens.filter(token => token !== req.body.token)
// 	res.sendStatus(204);
// })

// router.post("/token", (req,res)=>{
// 	let refreshToken = req.body.refreshToken;
// 	if(refreshToken == null) return res.sendStatus(401);
// 	if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
// 	jwt.verify(refreshToken, "ITLExperiment7Refresh", (err,user)=>{
// 		if(err) return res.sendStatus(403)
// 		const accessToken = jwt.sign({username : user.username, password : user.password}, "ITLExperiment7", { expiresIn : '30s'});
// 		res.json({accessToken : accessToken});
// 	})
// })

router.post("/login",

//ASAL
googleSignIn, passport.authenticate("local-sigin",{
	successRedirect:"/employees",
	failureRedirect:"/login?condition=incorrect password or emp-id"
}));





//JWT WALA
// (req,res)=>{
// 	console.log(req.body);
// 	let userObject = {
// 		username : req.body.username,
// 		password : req.body.password
// 	};
// 	let accessToken = jwt.sign(userObject, 'ITLExperiment7', { expiresIn : '10m'});
// 	let refreshToken = jwt.sign(userObject, 'ITLExperiment7Refresh');
// 	refreshTokens.push(refreshToken);
// 	res.json({ accessToken : accessToken, refreshToken : refreshToken });
// });






router.get("/logout",function(req,res){

	req.logout();
	res.redirect("/login")

});

module.exports=router;