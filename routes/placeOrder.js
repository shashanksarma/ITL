const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const path = require('path');
const app=express();

const router=express.Router();

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shashank@123",
  database : "miniproject"

});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected! placeOrder");
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

  /*let sql ="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold,persign.emp_id as per,tempSign.emp_id as temp FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id LEFT JOIN persign ON Employee.emp_id=persign.emp_id LEFT JOIN tempSign ON Employee.emp_id=tempSign.emp_id GROUP BY Employee.emp_id order by cars_sold desc ";
  db.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);

	});*/


});


router.get("/placeOrder",function(req,res){

	console.log("placing new order");

	let sql="SELECT *FROM cars;"
	db.query(sql,function(err,result){

		if(err) throw err;
		console.log(result,"cars");

		let sql1="SELECT *FROM Extras";
		db.query(sql1,function(err,result1){
			if(err) throw err;
			console.log(result1,"cars_extras");

			let sql2="SELECT emp_id FROM Employee";
			db.query(sql2,function(err,result2){
				if(err) throw err;
				console.log(result2,"emp_id");

				res.render("placeOrder",{car:result,extra:result1,emp_id:result2});

			})


		})

	})


	res.render("new_order");

});

router.post("/createOrder",function(req,res){

	console.log("creating new order",req.body);

	let body=req.body;

	let sql="SELECT * FROM Customer where customer_id phone_no="+body.phone2;
	db.query(sql,function(err,result){

		if(err) throw err;
		console.log(result);

		if(result.length){

			let sql1="SELECT COUNT(order_id) as count FROM orders";
			db.query(sql1,function(err,result1){
				if(err) throw err;
				console.log(result1);

				let order_id="O0"+result1[0].count;

				let sql2="SELECT COUNT(payment_id) as count FROM payment";
				db.query(sql2,function(err,result2){
					if(err) throw err;
					console.log(result2);

					let payment_id="P0"+result2[0].count;


						let sql4="SELECT qty_available,price FROM car_details where car_id='"+body.car_model+"'";
						db.query(sql4,function(err,result4){
							if(err) throw err;
							console.log(result4);

							if(result4[0].qty_available>0){
								let qty_available=result4[0].qty_available-1
								let sql5="UPDATE car_details SET qty_available="+qty_available+" where car_id='"+body.car_model+"'";

								db.query(sql5,function(err,result5){
									if(err) throw err;
									console.log(result5);

									let sql6="INSERT INTO payment VALUES('"+payment_id+"','"+body.pay_method+"',"+body.cur_amt+","+result4[0].price+")";

										db.query(sql6,function(err,result5){
											if(err) throw err;
											console.log(result5);

											let sql3="INSERT INTO Orders VALUES('"+order_id+"','"+body.pay_date+"','"+body.dely_date+"','"+body.car_model+"','"+result[0].customer_id+"','"+body.emp_id+"','"+payment_id+"','"+body.extra_id+"')";
											db.query(sql3,function(err,result3){
												if(err) throw err;
												console.log(result3);

												res.render("new_order",{condition:true});


											})



										})

								})

							} else{

								res.render("new_order",{condition:false});

							}

						})


					})


				})

			} else{

				let sqlNew="SELECT count(customer_id) as count FROM Customer";
				db.query(sqlNew,function(err,resultNew){

					if(err) throw err;
					console.log(resultNew);

					let customer_id=resultNew[0].count+1;
					let sqlNewInfo="INSERT INTO Customer VALUES('"+customer_id+"','"+body.client_name+"','"+body.client_addr+"','"+body.city+"',"+body.phone2+")";
					db.query(sqlNewInfo,function(err,resultNewInfo){

						if(err) throw err;
						console.log(resultNewInfo);

						let sql1="SELECT COUNT(order_id) as count FROM orders";
						db.query(sql1,function(err,result1){
							if(err) throw err;
							console.log(result1);

							let order_id="O0"+result1[0].count;

							let sql2="SELECT COUNT(payment_id) as count FROM payment";
							db.query(sql2,function(err,result2){
								if(err) throw err;
								console.log(result2);

								let payment_id="P0"+result2[0].count;


									let sql4="SELECT qty_available,price FROM car_details where car_id='"+body.car_model+"'";
									db.query(sql4,function(err,result4){
										if(err) throw err;
										console.log(result4);

										if(result4[0].qty_available>0){
											let qty_available=result4[0].qty_available-1
											let sql5="UPDATE car_details SET qty_available="+qty_available+" where car_id='"+body.car_model+"'";

											db.query(sql5,function(err,result5){
												if(err) throw err;
												console.log(result5);

												let sql6="INSERT INTO payment VALUES('"+payment_id+"','"+body.pay_method+"',"+body.cur_amt+","+result4[0].price+")";

													db.query(sql6,function(err,result5){
														if(err) throw err;
														console.log(result5);

														let sql3="INSERT INTO Orders VALUES('"+order_id+"','"+body.pay_date+"','"+body.dely_date+"','"+body.car_model+"','"+result[0].customer_id+"','"+body.emp_id+"','"+payment_id+"','"+body.extra_id+"')";
														db.query(sql3,function(err,result3){
															if(err) throw err;
															console.log(result3);

															res.render("new_order",{condition:true});


														})



													})

											})

										} else{

											res.render("new_order",{condition:false});

										}

								})


							})


						})


					})


				})

			}

		})

	res.render("new_order");

})

router.get("/prevOrder",function(req,res){

	console.log("updating new payment");
	let sql="SELECT Orders.order_id,payment.total_cost,payment.paid_amt FROM Orders,payment where Orders.payment_id=payment.payment_id AND Orders.payment_id IN(SELECT payment.payment_id FROM payment where payment.total_cost>payment.paid_amt)";
	db.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);

		res.render("prev_order",{orderObject:result});

	})


})

router.post("/prevOrder",function(req,res){

	console.log("updating new payment",req.body);

	let body=req.body;
	paid_amt=body.total_cost-body.balance_due;
	let sql="UPDATE payment SET paid_amt="+paid_amt+"where payment_id = (SELECT payment_id FROM Orders where order_id='"+body.order_id+"')";
	db.query(sql,function(err,result){

		if(err) throw err;
		console.log(result);

		res.redirect("/orders/prevOrder");

	})



})



module.exports=router;
