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
  password: "",
  database : "CarShowroom"

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
  
  //let sql ="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold,persign.emp_id as per,tempSign.emp_id as temp FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id LEFT JOIN persign ON Employee.emp_id=persign.emp_id LEFT JOIN tempSign ON Employee.emp_id=tempSign.emp_id GROUP BY Employee.emp_id order by cars_sold desc ";
  //let sql="CREATE TABLE payment (payment_id varchar(6) Primary Key Check(payment_id like 'P%'),paid_amount int,payment_method varchar(20) Check (payment_method IN ('Cheque','BankTransfer','DD','EMI','Cash')),total_cost int)";
  //let sql="INSERT INTO payment VALUES('P00003',700000,'DD',1000000),('P00004',1000000,'Cheque',1200000),('P00008',500000,'Cheque',500000),('P00009',1200000,'EMI',1500000)";
  //let sql="SELECT * FROM payment";
  //let sql="SELECT Orders.order_id,payment.total_cost,payment.paid_amount FROM Orders,payment where Orders.payment_id=payment.payment_id AND Orders.payment_id IN(SELECT payment.payment_id FROM payment where payment.total_cost>payment.paid_amount)";
  //let sql="CREATE TABLE car_details(car_id varchar(6) Primary Key Check(car_id like 'C%'),price int not null check(price>0),fuel_type varchar(10) check(fuel_type IN ('Petrol','Diesel')),color varchar(10) not null,model_no varchar(10) Not Null,year int not null,qty_available int check(qty_available>=0),transmission varchar(10) check(transmission IN('Manual','Automatic')),capacity int not null check(capacity>0),type varchar(10) not null check(type IN('SUV','Sedan','Hatchback','Sports'))) "
  //let sql="INSERT INTO car_details VALUES('C00003',400000,'Diesel','Blue','ABC500',2019,19,'Automatic',5,'Sedan'),('C00004',1400000,'Diesel','Black','SCX200',2020,21,'Manual',2,'Sports'),('C00006',1100000,'Petrol','Grey','CD99',2020,22,'Automatic',5,'Hatchback'),('C00008',1000000,'Petrol','Red','GLS201',2020,14,'Manual',5,'SUV')";
  //let sql="SELECT * FROM car_details";
  //let sql="CREATE TABLE extra (extra_id varchar(6) Primary Key Check(extra_id like 'EX%'),name varchar(20) not null,price int not null check(price>0),type varchar(10) not null check(type IN('SUV','Sedan','Hatchback','Sports')))";
  //let sql="INSERT INTO extra VALUES('EX1217','Armrest',100000,'Hatchback'),('EX1234','Alloy Wheels',100000,'SUV'),('EX5678','Sunroof',200000,'Sedan')";
  //let sql="SELECT * FROM extra";
  //let sql="CREATE TABLE customer (cust_id int AUTO_INCREMENT Primary Key,name varchar(20) not null,address varchar(30) not null,city varchar(20) not null,phone_no int null)"
  //let sql="INSERT INTO customer VALUES(010208,'Hamilton','Sunderganj','Akola',9322272203),(010209,'Schumachar','Dharavi','Mumbai',9322272213),(010210,'Verstappen','Chembur','Mumbai',9322272223)";
  //let sql="SELECT * FROM customer";
  //let sqlNew="SELECT count(cust_id) as custCount FROM Customer";
  //let sql="SELECT * FROM Orders";
  //let sql="INSERT INTO Orders VALUES('O00111','2019-10-13','2019-10-15','C00002','010207','E00004','P00111',null)";
  //let sql="SELECT * FROM Orders where order_id='O00111'";
  let sql='SELECT COUNT(car_id) as car_count,car_id FROM Orders GROUP BY car_id order by car_count desc LIMIT 4';
  let sql="SELECT COUNT(MONTH(dely_date)) as sell_count,dely_date FROM Orders where dely_date>=now() - INTERVAL 5 MONTH GROUP BY MONTH(dely_date)"
  db.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
		
	});


});

var check=function(req,res,next){

	if(req.user){

		next();
	} else{

		res.redirect('/login');
	}

}



router.get("/placeOrder",check,function(req,res){

	console.log("placing new order");

	let sql="SELECT *FROM car_details;"
	db.query(sql,function(err,result){

		if(err) throw err;
		console.log(result,"cars");

		let sql1="SELECT *FROM extra";
		db.query(sql1,function(err,result1){
			if(err) throw err;
			console.log(result1,"cars_extras");


			let sql2="SELECT emp_id FROM Employee";
			db.query(sql2,function(err,result2){
				if(err) throw err;
				console.log(result2,"emp_id");

				if(req.query.Order_status){
					res.render("new_order",{car:result,extra:result1,emp_id:result2,condition:req.query.condition});

				} else{
					res.render("new_order",{car:result,extra:result1,emp_id:result2,condition:"first"});

				}
				


			})


		})

	})

	


});

router.post("/createOrder",check,function(req,res){

	console.log("creating new order",req.body);

	let body=req.body;

	let sql="SELECT * FROM Customer where phone_no="+body.phone2;
	db.query(sql,function(err,result){

		if(err) throw err;
		console.log(result,"hi1");

		if(result.length){

			let sql1="SELECT COUNT(order_id) as count FROM orders";
			db.query(sql1,function(err,result1){
				if(err) throw err;
				console.log(result1,"hi2");

				let order_id="O0"+(result1[0].count+1);
				
				let sql2="SELECT COUNT(payment_id) as count FROM payment";
				db.query(sql2,function(err,result2){
					if(err) throw err;
					console.log(result2,"hi3");

					let payment_id="P0"+(result2[0].count+1);
					

						let sql4="SELECT qty_available,price FROM car_details where car_id='"+body.car_id+"'";
						db.query(sql4,function(err,result4){
							if(err) throw err;
							console.log(result4,"hi4");

							if(result4[0].qty_available>0){
								let qty_available=result4[0].qty_available-1
								let sql5="UPDATE car_details SET qty_available="+qty_available+" where car_id='"+body.car_id+"'";

								db.query(sql5,function(err,result5){
									if(err) throw err;
									console.log(result5,"hi5");

									let sql6="INSERT INTO payment VALUES('"+payment_id+"',"+body.cur_amt+",'"+body.pay_method+"',"+body.total_amt+")";

										db.query(sql6,function(err,result5){
											if(err) throw err;
											console.log(result5,"hi6");


											if(body.extra_id&&body.car_id){
												let sql3="INSERT INTO Orders VALUES('"+order_id+"','"+body.pay_date+"','"+body.dely_date+"','"+body.car_id+"','"+result[0].cust_id+"','"+body.emp_id+"','"+payment_id+"','"+body.extra_id+"')";
												db.query(sql3,function(err,result3){
												if(err) throw err;
												console.log(result3,"hii8");

															//res.render("new_order",{condition:true});
												res.redirect("/order/placeOrder?Order_status=successful");


												})

											} else if(body.extra_id==undefined&&body.car_id){

												let sql3="INSERT INTO Orders VALUES('"+order_id+"','"+body.pay_date+"','"+body.dely_date+"','"+body.car_id+"','"+result[0].cust_id+"','"+body.emp_id+"','"+payment_id+"',null)";
												db.query(sql3,function(err,result3){
													if(err) throw err;
													console.log(result3,"hii8");

															//res.render("new_order",{condition:true});
													res.redirect("/order/placeOrder?Order_status=successful");


												})

											} else{
												let sql3="INSERT INTO Orders VALUES('"+order_id+"','"+body.pay_date+"','"+body.dely_date+"',null,'"+result[0].cust_id+"','"+body.emp_id+"','"+payment_id+"',null)";
												db.query(sql3,function(err,result3){
													if(err) throw err;
													console.log(result3,"hii8");
															//res.render("new_order",{condition:true});
													res.redirect("/order/placeOrder?Order_status=successful");
												})
											}
									})

								})

							} else{

								res.redirect("/order/placeOrder?Order_status=failed");
								

							}

						})


					})


				})

			} else{

				let sqlNew="SELECT count(cust_id) as custCount FROM Customer";
				db.query(sqlNew,function(err,resultNew){

					if(err) throw err;
					console.log(resultNew,"hii1");

					let customer_id=resultNew[0].custCount+1;
					console.log(customer_id);
					let sqlNewInfo="INSERT INTO Customer VALUES("+customer_id+",'"+body.client_name+"','"+body.client_addr+"','"+body.city+"',"+body.phone2+")";
					db.query(sqlNewInfo,function(err,resultNewInfo){

						if(err) throw err;
						console.log(resultNewInfo,"hii2");

						let sql1="SELECT COUNT(order_id) as count FROM orders";
						db.query(sql1,function(err,result1){
							if(err) throw err;
							console.log(result1,"hii3");

							let order_id="O0"+(result1[0].count+1);
							console.log(order_id);
							let sql2="SELECT COUNT(payment_id) as count FROM payment";
							db.query(sql2,function(err,result2){
								if(err) throw err;
								console.log(result2,"hii4");

								let payment_id="P0"+(result2[0].count+1);
								
								console.log(payment_id);
									let sql4="SELECT qty_available,price FROM car_details where car_id='"+body.car_id+"'";
									db.query(sql4,function(err,result4){
										if(err) throw err;
										console.log(result4,"hii5");

										if(result4[0].qty_available>0){
											let qty_available=result4[0].qty_available-1
											let sql5="UPDATE car_details SET qty_available="+qty_available+" where car_id='"+body.car_id+"'";

											db.query(sql5,function(err,result5){
												if(err) throw err;
												console.log(result5,"hii6");

												let sql6="INSERT INTO payment VALUES('"+payment_id+"',"+body.cur_amt+",'"+body.pay_method+"',"+body.total_amt+")";

													db.query(sql6,function(err,result5){
														if(err) throw err;
														console.log(result5,"hii7");

														if(body.extra_id&&body.car_id){
															let sql3="INSERT INTO Orders VALUES('"+order_id+"','"+body.pay_date+"','"+body.dely_date+"','"+body.car_id+"','"+customer_id+"','"+body.emp_id+"','"+payment_id+"','"+body.extra_id+"')";
														db.query(sql3,function(err,result3){
															if(err) throw err;
															console.log(result3,"hii8");

															//res.render("new_order",{condition:true});
															res.redirect("/order/placeOrder");


														})

														} else if(body.extra_id==undefined&&body.car_id){

															let sql3="INSERT INTO Orders VALUES('"+order_id+"','"+body.pay_date+"','"+body.dely_date+"','"+body.car_id+"','"+customer_id+"','"+body.emp_id+"','"+payment_id+"',null)";
														db.query(sql3,function(err,result3){
															if(err) throw err;
															console.log(result3,"hii8");

															//res.render("new_order",{condition:true});
															res.redirect("/order/placeOrder");


														})

														} else{
															let sql3="INSERT INTO Orders VALUES('"+order_id+"','"+body.pay_date+"','"+body.dely_date+"',null,'"+customer_id+"','"+body.emp_id+"','"+payment_id+"',null)";
														db.query(sql3,function(err,result3){
															if(err) throw err;
															console.log(result3,"hii8");

															//res.render("new_order",{condition:true});
															res.redirect("/order/placeOrder?Order_status=successful");


														})



														}

														

												

													})

											})

										} else{

											//res.render("new_order",{condition:false});
											res.redirect("/order/placeOrder?Order_status=failed");


										}

								})


							})


						})


					})


				})

			}

		})


})

router.get("/prevOrder",check,function(req,res){

	console.log("updating new payment");
	let sql="SELECT Orders.order_id,payment.total_cost,payment.paid_amount FROM Orders,payment where Orders.payment_id=payment.payment_id AND Orders.payment_id IN(SELECT payment.payment_id FROM payment where payment.total_cost>payment.paid_amount)";
	db.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);

		if(req.query.Order_status){

			res.render("prev_order",{orderObject:result,condition:req.query.Order_status});


		} else{
			console.log("yes here");
			res.render("prev_order",{orderObject:result,condition:"first"});

		}
		
	})


})

router.post("/prevOrder",check,function(req,res){

	console.log("updating new payment",req.body);

	let body=req.body;
	paid_amount=Number(body.total_cost) - Number(body.paym_due);
	console.log(paid_amount);
	let sql="UPDATE payment SET paid_amount = "+paid_amount+" where payment_id IN (SELECT payment_id FROM Orders where order_id='"+body.order_id+"')";
	db.query(sql,function(err,result){

		if(err){
			res.redirect("/order/prevOrder?Order_status=failed");
		} else{

			console.log(result);

			res.redirect("/order/prevOrder?Order_status=successful");

		}
		

	})



})



module.exports=router;