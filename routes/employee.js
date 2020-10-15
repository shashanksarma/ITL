const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path = require('path');
const mysql=require('mysql');

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
  console.log("Connected!");
  //let sql="CREATE TABLE Employee(emp_id varchar(6) Primary Key Check(emp_id like 'E%'),name varchar(30) not null,address varchar(30) not null,city varchar(30) not null,state varchar(20),dob DATE not null,joining_date DATE not null,salary int not null check(salary>0),phone_no int not null)";
  //let sql="CREATE TABLE orders(order_id varchar(6) Primary Key check(order_id like 'O%'),date_order DATE not  null,dely_date DATE check(dely_date>=date_order),car_id varchar(6),cust_id varchar(6),emp_id varchar(6),payment_id varchar(6) not null,extra_id varchar(6),Foreign Key (emp_id) References Employee(emp_id))";
  //let sql="INSERT INTO Employee VALUES('E00002','Bhushan','Dahisar','Mumbai','Maharashtra','2000-03-16','2017-03-16',150000,9324233439),('E00003','Vivek','Borivali','Mumbai','Maharashtra','2000-03-19','2019-03-16',300000,9324238438),('E00004','Vatsa','Mulund','Mumbai','Maharashtra','1970-09-11','2016-03-16',500000,9524233438),('E00005','Rohit Sharma','Borivali','Mumbai','Maharashtra','1988-04-30','2016-03-16',800000,8324233438),('E00006','Virat Kohli','Delhi','Delhi','Delhi','1989-11-05','2016-03-16',900000,9324733438),('E00008','KL Rahul','Malad','Mumbai','Maharashtra','1994-03-16','2016-03-16',700000,9624233438),('E00009','MS Dhoni','Malad','Ranchi','Bihar','1982-03-16','2000-03-16',900000,9924233438),('E00010','Jasprit Bumrah','Malad','Mumbai','Maharashtra','1995-03-16','2010-07-09',800000,9124233438)";
 //let sql="INSERT INTO Orders VALUES('O00002','2020-04-16','2020-06-12','C00002','010207','E00001','P00002','EX0002'),('O00003','2020-05-16','2020-06-19','C00003','010208','E00001','P00003','EX0003'),('O00004','2020-05-17','2020-06-12','C00004','010208','E00001','P00004','EX0005'),('O00005','2020-04-16','2020-06-12','C00002','010207','E00007','P00007','EX0004'),('O00006','2020-04-16','2020-06-12','C00004','010209','E00007','P00008','EX0004'),('O00007','2020-05-16','2020-07-12','C00006','010210','E00007','P00009','EX0014'),('O00008','2020-05-16','2020-07-12','C00006','010210','E00004','P00010','EX0014'),('O00009','2020-05-16','2020-07-12','C00008','010211','E00004','P00011','EX0013'),('O00010','2020-06-16','2020-08-12','C00009','010212','E00004','P00012','EX0013'),('O00011','2020-06-16','2020-08-12','C00010','010211','E00003','P00014','EX0015'),('O00012','2020-06-16','2020-08-12','C00011','010211','E00003','P00015','EX0016'),('O00013','2020-07-16','2020-08-16','C00012','010215','E00003','P00016','EX0015')";
  //let sql="SELECT *FROM Orders";
  //let sql ="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee,Orders  where Employee.emp_id=Orders.emp_id GROUP BY Orders.emp_id";
  //let sql="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee,Orders  where Employee.emp_id=Orders.emp_id  AND (Orders.emp_id =(SELECT Employee.emp_id FROM Employee,Orders where Employee.emp_id=Orders.emp_id  AND YEAR(Orders.dely_date)=('2020') GROUP BY Orders.emp_id order by COUNT(Orders.emp_id) desc LIMIT 1) OR Orders.emp_id =( SELECT emp_id FROM Employee where emp_id='E00004') OR Orders.emp_id= (SELECT emp_id FROM Employee where name='Param Patil'))GROUP BY Orders.emp_id ";
  //let sql="SELECT YEAR(dely_date) AS YEAR FROM Orders GROUP BY YEAR(dely_date)";
  //let sql="SELECT YEAR(joining_date) AS YEAR FROM Employee GROUP BY YEAR(joining_date)";
  //let sql ="SELECT   Employee.emp_id,Employee.salary FROM Employee,Orders where Employee.emp_id=Orders.emp_id AND Employee.salary=300000 GROUP BY Employee.emp_id ";

  //let sql ="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold,persign.emp_id as per,tempSign.emp_id as temp FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id LEFT JOIN persign ON Employee.emp_id=persign.emp_id LEFT JOIN tempSign ON Employee.emp_id=tempSign.emp_id GROUP BY Employee.emp_id order by cars_sold desc ";
  let sql="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.customer_id,Orders.extra_id,customer.name FROM Employee,Orders,customer where Employee.emp_id=Orders.emp_id AND customer.cust_id=Orders.customer_id AND Employee.emp_id='E00001'";
  db.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);

	});


});

//
// router.post("/check",function(req,res){
//   console.log(req.body);
// })


router.get("/",function(req,res){
	if(req.user){
		let mainObject;
	console.log(req.user);
	//let sql ="SELECT * FROM Employee where emp_id IN(SELECT emp_id FROM orders GROUP BY emp_id HAVING COUNT(emp_id)>2)";
	//let sql ="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee,Orders  where Employee.emp_id=Orders.emp_id GROUP BY Orders.emp_id";
	//let sql ="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id GROUP BY Employee.emp_id order by cars_sold desc LIMIT 4";
	let sql ="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold,persign.emp_id as per,tempSign.emp_id as temp FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id LEFT JOIN persign ON Employee.emp_id=persign.emp_id LEFT JOIN tempSign ON Employee.emp_id=tempSign.emp_id GROUP BY Employee.emp_id order by cars_sold desc LIMIT 4";
	let check;
	db.query(sql,function(err,result){
		console.log(result);
		let sql1="SELECT YEAR(dely_date) AS YEAR FROM Orders GROUP BY YEAR(dely_date)";
		db.query(sql1,function(err,result1) {

			console.log(result1);
			let sql2="SELECT YEAR(joining_date) AS YEAR FROM Employee GROUP BY YEAR(joining_date)";
			db.query(sql2,function(err,result2) {
				console.log(result2);
				check={mainObject:result,topYear:result1,joinYear:result2};
				res.render('Employee',{mainObject:result,topYear:result1,joinYear:result2});

			});

		});
	})
	console.log("hi",check);

	} else{
		res.redirect('/login');
	}


	//res.sendFile(path.join(__dirname,"./public","/Employee.html"));


});

router.post("/filterEmployee",function(req,res){

	console.log(req.body);
	let reqBody=req.body;
	//let sql="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee,Orders  where Employee.emp_id=Orders.emp_id  and emp_id IN ((SELECT emp_id FROM Employee where emp_id="+req.body.emp_id+"),(SELECT emp_id FROM Employee where name="+req.body.name+"),) GROUP BY Orders.emp_id"
	//let sql="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id ";
	let sql ="SELECT Employee.emp_id,Employee.name,Employee.salary,Employee.state,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id GROUP BY Employee.emp_id HAVING";//(Employee.emp_id='E00001') OR (Employee.name='Param Patil') OR (Employee.salary>100000 AND Employee.salary<=700000 AND Employee.state='Maharashtra')";
	let checkObject={};
	let addOR=false;
	//let sql1="SELECT Employee.emp_id,Employee.name,Employee.salary,Employee.state,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id GROUP BY Employee.emp_id ";
	let sql1="SELECT Employee.emp_id,Employee.name,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold,persign.emp_id as per,tempSign.emp_id as temp FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id LEFT JOIN persign ON Employee.emp_id=persign.emp_id LEFT JOIN tempSign ON Employee.emp_id=tempSign.emp_id GROUP BY Employee.emp_id ";
	let entered=false;

	if(reqBody.year&&reqBody.year.length>0){
		addOR=true;

		sql1+="HAVING (";
		entered=true;
		for(var i=0;i<reqBody.year.length;i++){
			sql1+="Employee.emp_id =(SELECT Employee.emp_id FROM Employee,Orders where Employee.emp_id=Orders.emp_id  AND YEAR(Orders.dely_date)=('"+reqBody.year[i]+"') GROUP BY Orders.emp_id order by COUNT(Orders.emp_id) desc LIMIT 1) ";
			if(i!=reqBody.year.length-1){
				sql1+="OR ";
			}
		}
		sql1+=") "




	}
	if(reqBody.name){
		//let sql ="SELECT Employee.emp_id,Employee.name,Employee.salary,Employee.state,Employee.joining_date,COUNT(Orders.emp_id) AS cars_sold FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id GROUP BY Employee.emp_id HAVING";
		if(!entered){
			entered=true;
			sql1+="HAVING ("
		} else{
			sql1+="OR (";
		}

		sql1+=" Employee.name='"+reqBody.name+"') ";

	}

	if(reqBody.emp_id){
		if(!entered){
			entered=true;
			sql1+="HAVING ("
		} else{
			sql1+="OR (";
		}

		sql1+="Employee.emp_id ='"+reqBody.emp_id+"') ";

	}



	if(reqBody.state&&reqBody.state.length>0){
		sql+="OR (";
		for(var i=0;i<reqBody.state.length;i++){
			sql+="Employee.state='"+reqBody.state[i]+"' ";
			if(i!=reqBody.state.length-1){
				sql+= "OR "
			}
		}
		sql+=") ";
	}

	if(reqBody.city&&reqBody.city.length>0){
		sql+="AND (";
		for(var i=0;i<reqBody.city.length;i++){
			sql+="Employee.city='"+reqBody.city[i]+"' ";
			if(i!=reqBody.city.length-1){
				sql+= "OR "
			}
		}
		sql+=") ";
	}

	let secondFilter=false;
	if(reqBody.dateJoin&&reqBody.dateJoin.length>0){
		if(!entered){
			sql1+="HAVING ("
			entered=true;
			secondFilter=true;
		} else{
			sql1+=" OR("
			secondFilter=true;
		}


		for(var i=0;i<reqBody.dateJoin.length;i++){
			if(i==0){
				sql1+="("
			}
			sql1+="YEAR(Employee.joining_date)='"+reqBody.dateJoin[i]+"' ";
			if(i!=reqBody.dateJoin.length-1){
				sql1+= "OR "
			}
		}
		sql1+=") ";
	}

	if(reqBody.minSal){
		if(!entered){
			sql1+="HAVING ("
			entered=true;
			secondFilter=true;
		} else if(!secondFilter){
			sql1+="OR ("
			secondFilter=true;

		} else{
			sql1+="AND ";
		}

		sql1+="(Employee.salary>="+reqBody.minSal+") ";
	}

	if(reqBody.maxSal){
		if(!entered){
			sql1+="HAVING ("
			entered=true;
			secondFilter=true;
		} else if(!secondFilter){
			sql1+="OR ("
			secondFilter=true;

		} else{
			sql1+="AND ";
		}

		sql1+="(Employee.salary<="+reqBody.maxSal+") ";
	}

	if(secondFilter){
		sql1+=") ";
	}

	if(entered){
		console.log(sql1);
		db.query(sql1,function(err,result){
		if(err) throw err;
		console.log(result);
		res.json({checkObject:result});

	});

	}
	//sql+=" GROUP BY Orders.emp_id ";
	//let sql="SELECT * FROM Employee where emp_id='E00001'";

});



router.post("/delEmployee",function(req,res){

	console.log(req.body);

	let sql="DELETE FROM Employee where Employee.emp_id='"+req.body.item+"' ";
	console.log(sql);
	db.query(sql,function (err,result) {
		if(err){
			res.json({item:req.body.item,done:false})
		}else{
			console.log(result);
		res.json({result:result,done:true,item:req.body.item});
		}

	})
});

router.get("/addEmployee",function(req,res){

	if(req.user){
		if(req.query.err){
			console.log("yesss reached");
			res.render('addEmployee',{err:true})
		}else{
			res.render('addEmployee',{err:false});

		}
	} else{
		res.redirect("/login");
	}



});

router.post("/addEmployee",function(req,res){

	console.log(req.body);
	let info=req.body;
	let sql="INSERT INTO Employee VALUES('"+info.emp_id+"','"+info.name+"','"+info.address+"','"+info.city+"','"+info.state+"','"+info.dob+"','"+info.joining_date+"',"+info.salary+","+info.phone_no+")";
	console.log(sql);
	db.query(sql,function(err,result){
		if(err){
			res.redirect("/employees/addEmployee?err=true");
		}
		else{
			console.log(result);
			res.redirect("/employees/viewEmployee?emp_id="+info.emp_id);
		}
	})

	//res.render('addEmployee');

});


router.get("/viewEmployee",function(req,res){

	if(req.user){
        // console.log("Bhushannnnnn1");
		let emp_id=req.query.emp_id;
	if(emp_id){
		console.log("hii",req.query.update);
		let userObject;
		let sql="SELECT * FROM Employee where emp_id='"+emp_id+"'";
		db.query(sql,function(err,result){

			if(err){
          // console.log("Bhushannnnnn3");
				res.redirect("/employees");
			} else{

				console.log(result,"hee");
				userOBject=result;
				let sellObject;

				let sql1="SELECT YEAR(dely_date),COUNT(YEAR(dely_date)) AS cars_sold,Employee.emp_id FROM Employee  LEFT JOIN Orders ON Employee.emp_id=Orders.emp_id where Employee.emp_id='"+emp_id+"' GROUP BY YEAR(dely_date)";
				db.query(sql1,function(err,result1){

					if(err){
						//res.redirect("/employees");
						console.log("yess error found");
					} else{

						console.log(result1,"hee2");
						sellObject=result1;
						let orderObject;

						//let sql2="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.cust_id,Orders.extra_id FROM Employee,Orders where Employee.emp_id=Orders.emp_id AND Employee.emp_id='"+emp_id+"' order by Orders.dely_date desc LIMIT 3";
						let sql="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.cust_id,Orders.extra_id,customer.name FROM Employee,Orders,customer where Employee.emp_id=Orders.emp_id AND customer.cust_id=Orders.cust_id AND Employee.emp_id='"+emp_id+"' order by Orders.dely_date desc LIMIT 3";
						db.query(sql2,function(err,result2){

							if(err){
								console.log(err);
								res.redirect("/employees");
							} else{

								console.log(result2,"hee3");
								orderObject=result2;
								if(req.query.update==undefined){

									res.render("viewEmployee",{userObject:result,orderObject:result1,sellObject:result2,update:false})

								}else if(req.query.update=='error'){

									res.render("viewEmployee",{userObject:result,orderObject:result1,sellObject:result2,update:'error'});

								} else if(req.query.update=='done'){
									console.log("here");
									res.render("viewEmployee",{userObject:result,orderObject:result1,sellObject:result2,update:'done'})
								}
							}


						})

					}

				})

			}



		});
	} else{

		res.redirect("/employees");

	}


	} else{

		res.redirect("/login");

	}





});

router.get("/getInfoEmployee",function(req,res){

	if(req.user){

		console.log(req.query.emp_id);
		let emp_id=req.query.emp_id;
		if(emp_id){

			let sql="SELECT * FROM Employee where emp_id='"+emp_id+"'";
			deb.query(sql,function(err,result){

				if(err){
					console.log(err);
					res.json({done:false,result:undefined})
				} else{

					console.log(result);
					res.json({done:true,result:result});

				}

			})


		}

	} else{

		res.redirect("/login");
	}


});


router.get("/viewAllOrders",function(req,res){

	if(req.user){
		console.log(req.query.emp_id);

		let emp_id=req.query.emp_id;
		//let sql2="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.cust_id,Orders.extra_id,customer.name FROM Employee,Orders,customer where Employee.emp_id=Orders.emp_id AND customer.cust_id=Orders.cust_id AND Employee.emp_id='"+emp_id+"'";
		let sql2="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.cust_id,Orders.extra_id,customer.name FROM Employee,Orders,customer where Employee.emp_id=Orders.emp_id AND customer.cust_id=Orders.cust_id AND Employee.emp_id='"+emp_id+"'";
		db.query(sql2,function(err,result){

			if(err){
				throw err;
			} else{
				console.log(result);
				res.json({result:result});
			}

		})
	} else{

		res.redirect("/login");

	}




});

router.post("/updateEmployee",function(req,res){

	console.log(req.body);
	let update=req.body;

	if(update){

		let sql="UPDATE Employee set emp_id='"+update.emp_id+"',name='"+update.name+"', address='"+update.address+"',city='"+update.city+"',state='"+update.state+"',dob='"+update.dob+"',joining_date='"+update.joining_date+"',salary="+update.salary+",phone_no="+update.phone_no+" where emp_id='"+update.where+"'";
		db.query(sql,function(err,result){

			if(err){
				console.log(err);
				//res.redirect("/employees/viewEmployee?emp_id="+update.where+"&&update=error");
				res.json({done:false})
			} else{
				console.log(result);

				sql="SELECT *FROM Employee where emp_id='"+update.emp_id+"'";
				db.query(sql,function(err,result1){
					console.log(result1);
					//res.redirect("/employees/viewEmployee?emp_id="+update.emp_id+"&&update=done");
					let update=result1;
					res.json({done:true,update});

				})


			}

		})




	} else{

		res.redirect("/employees");

	}


});


router.post("/giveAccess",function(req,res){

	console.log(req.query.emp_id,"inside give");

	let emp_id=req.query.emp_id;

	let sql="INSERT INTO tempSign VALUES('"+emp_id+"')";
	db.query(sql,function(err,result){

		if(err) throw err;

		console.log(result);

		res.redirect("/employees");



	})







});

router.post("/takeAccess",function(req,res){

	console.log(req.query.emp_id,"inside takes");

	let emp_id=req.query.emp_id;

	let sql="SELECT *FROM tempSign where emp_id='"+emp_id+"'";
	db.query(sql,function(err,result){

		if(err) throw err;

		console.log(result);

		if(result.length){

			let sql1="DELETE FROM tempSign where emp_id='"+emp_id+"'";
			db.query(sql1,function(err,result1){

				if(err) throw err;

				console.log(result1);
				res.redirect("/employees");

			})

		} else{

			let sql1="DELETE FROM perSign where emp_id='"+emp_id+"'";
			db.query(sql1,function(err,result1){

				if(err) throw err;

				console.log(result1);
				res.redirect("/employees");

			})



		}



	})







});



module.exports=router;
