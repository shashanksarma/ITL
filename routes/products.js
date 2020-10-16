const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path = require('path');
const mysql=require('mysql');
const mysqlConnection=require("../connections");
const Router= express.Router(); //initialize a router


app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//

var checkk= function(req,res,next){
  if(req.user)
  next();
  else
  {
    res.redirect("/login");
  }

}


Router.get("/",function(req,res){
  console.log(req.user);
    let sql="SELECT car_details.car_id,car_details.model_no,car_details.type,car_details.price,car_details.transmission,COUNT(orders.car_id) AS cars_sold from car_details LEFT JOIN orders ON car_details.car_id=orders.car_id GROUP BY car_details.car_id ORDER BY cars_sold DESC LIMIT 6;";
    mysqlConnection.query(sql, (err,rows,fields)=>{
      if(err) throw err;
      console.log(rows,);
      res.render("product",{rows:rows,user:req.user});
    })
});


Router.get("/addproduct",checkk,function(req,res){
     if(req.query.err){
  		console.log("yesss reached");
  		res.render('addproduct',{err:true})
  	}else{
  		res.render('addproduct',{err:false});
  }
})

Router.post("/addproduct",function(req,res){
  console.log(req.body);
  let info=req.body;
  let sql1="INSERT INTO car_details VALUES('"+info.car_id+"',"+info.price+",'"+info.fuel_type+"','"+info.model_no+"',"+info.year+","+info.qty_available+",'"+info.transmission+"',"+info.capacity+",'"+info.type+"')";
  console.log(sql1);
  mysqlConnection.query(sql1, (err,result,fields)=>{
    if(err){
		throw err;
			//res.redirect("/product/addproduct?err=true");
		}
		else{
			console.log(result);
			res.redirect("/product");
		}
  })
})

Router.get("/viewProduct",function(req,res){
        // console.log("Bhushannnnnn1");
        console.log(req.user);
		let car_id=req.query.car_id;
	if(car_id){
		console.log("hii",req.query.update);
		let userObject;
		let sql="SELECT * FROM car_details where car_id='"+car_id+"'";
		mysqlConnection.query(sql,function(err,result){

			if(err){
          // console.log("Bhushannnnnn3");
				res.redirect("/product");
			} else{

				console.log(result,"hee");
				userObject=result;
				let sellObject;

				let sql1="SELECT YEAR(dely_date),COUNT(YEAR(dely_date)) AS cars_sold,car_details.car_id FROM car_details LEFT JOIN orders ON car_details.car_id=Orders.car_id where car_details.car_id='"+car_id+"' GROUP BY YEAR(dely_date)";
				mysqlConnection.query(sql1,function(err,result1){

					if(err){
						//res.redirect("/employees");
						console.log("yess error found");
					} else{

						console.log(result1,"hee2");
						sellObject=result1;
						let orderObject;

						let sql2="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.cust_id,Orders.extra_id FROM car_details,Orders where car_details.car_id=Orders.car_id AND car_details.car_id='"+car_id+"' order by Orders.dely_date desc LIMIT 3";
						mysqlConnection.query(sql2,function(err,result2){

							if(err){
								console.log(err);
								res.redirect("/product");
							} else{

								console.log(result2,"hee3");
								orderObject=result2;
								if(req.query.update==undefined){

									res.render("viewproduct",{userObject:result,orderObject:result1,sellObject:result2,update:false,user:req.user})

								}else if(req.query.update=='error'){

									res.render("viewproduct",{userObject:result,orderObject:result1,sellObject:result2,update:'error',user:req.user});

								} else if(req.query.update=='done'){
									console.log("here");
									res.render("viewproduct",{userObject:result,orderObject:result1,sellObject:result2,update:'done',user:req.user})
								}
							}
						})
					}
				})
			}
		});
	} else{
		res.redirect("/product");
	}
});

Router.get("/viewAllProducts",checkk,function(req,res){

		console.log(req.query.car_id);

		let car_id=req.query.car_id;
		let sql2="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.cust_id,Orders.extra_id FROM car_details,Orders where car_details.car_id=Orders.car_id AND car_details.car_id='"+car_id+"'";
		mysqlConnection.query(sql2,function(err,result){

			if(err){
				throw err;
			} else{
				console.log(result);
				res.json({result:result});
			}

		})

});

Router.post("/updateProduct",function(req,res){

	console.log(req.body);
	let update=req.body;

	if(update){

		let sql="UPDATE car_details set car_id='"+update.car_id+"',price="+update.price+", fuel_type='"+update.fuel_type+"',model_no='"+update.model_no+"',year="+update.year+",qty_available="+update.qty_available+",transmission='"+update.transmission+"',capacity="+update.capacity+",type='"+update.type+"' where car_id='"+update.where+"'";
		mysqlConnection.query(sql,function(err,result){

			if(err){
				console.log(err);
				//res.redirect("/employees/viewEmployee?emp_id="+update.where+"&&update=error");
				res.json({done:false})
			} else{
				console.log(result);
				sql="SELECT *FROM car_details where car_id='"+update.car_id+"'";
				mysqlConnection.query(sql,function(err,result1){
					console.log(result1);
					//res.redirect("/employees/viewEmployee?emp_id="+update.emp_id+"&&update=done");
					let update=result1;
					res.json({done:true,update});
				})
			}
		})
	} else{
		res.redirect("/product");
	}
});



Router.post("/delProduct",function(req,res){

	console.log(req.body);

	let sql="DELETE FROM car_details where car_details.car_id='"+req.body.item+"' ";
	console.log(sql);
	mysqlConnection.query(sql,function (err,result) {
		if(err){
			res.json({item:req.body.item,done:false})
		}else{
			console.log(result);
		res.json({result:result,done:true,item:req.body.item});
		}

	})
})

// Router.post("/check",function(req,res){
//   console.log(req.body);
// })

Router.post("/filterproduct",function(req,res){
  let reqBody=req.body;
  console.log(req.body,"helllodosadja");
  let sql2="SELECT car_details.car_id,car_details.model_no,car_details.type,car_details.price,car_details.transmission,COUNT(orders.car_id) AS cars_sold,car_details.fuel_type,car_details.year,car_details.capacity from car_details LEFT JOIN orders ON car_details.car_id=orders.car_id";
  let entered=false;
  let addand=false;
  let checkObject={};
  sql2+=" GROUP BY car_details.car_id"
  if(reqBody.type && reqBody.type!='none')
  {
    if(!entered)
    {
      sql2+=" HAVING(";
      entered=true;
      addand=true;
    }
    sql2+="car_details.type='"+reqBody.type+"')";
  }
  if(reqBody.transmission && reqBody.transmission!='none')
  {
    if(!entered)
    {
      sql2+=" HAVING(";
      entered=true;
      addand=true;
    }
    else if (addand) {
      sql2+=" AND (";
    }
    sql2+="car_details.transmission='"+reqBody.transmission+"')";
  }
  if(reqBody.fuel_type && reqBody.fuel_type!='none')
  {
    if(!entered)
    {
      sql2+=" HAVING(";
      entered=true;
      addand=true;
    }
    else if (addand) {
      sql2+=" AND (";
    }
    sql2+="car_details.fuel_type='"+reqBody.fuel_type+"')";
  }
  if(reqBody.year)
  {
    if(!entered)
    {
      sql2+=" HAVING(";
      entered=true;
      addand=true;
    }
    else if (addand) {
      sql2+=" AND ("
    }
    sql2+="car_details.year="+reqBody.year+")";
  }
  if(reqBody.capacity)
  {
    if(!entered)
    {
      sql2+=" HAVING(";
      entered=true;
      addor=true;
    }
    else if (addand) {
      sql2+=" AND (";
    }
    sql2+="car_details.capacity="+reqBody.capacity+")";
  }
  if(reqBody.sort)
  {
    if(reqBody.sort=="car_id")
    {sql2+=" ORDER BY car_details.car_id DESC;";}
    else if(reqBody.sort=="price")
    {sql2+=" ORDER BY car_details.price DESC;";}
    else if(reqBody.sort=="qty_available")
    {sql2+=" ORDER BY car_details.capacity DESC;";}
    else
    {sql2+=" ORDER BY cars_sold DESC;";}
    entered=true;
  }
  if(entered){
		console.log(sql2);
		mysqlConnection.query(sql2,function(err,result){
		if(err) throw err;
		console.log(result);
		res.json({checkObject:result,user:req.user});

	});

	}
})


Router.get("/extras",function(req,res){

    let sql="SELECT extra.extra_id,extra.name,extra.price,extra.type,COUNT(orders.extra_id) AS extras_sold FROM extra LEFT JOIN orders ON extra.extra_id=orders.extra_id GROUP BY extra.extra_id ORDER BY extras_sold DESC LIMIT 4;";
    mysqlConnection.query(sql, (err,rows,fields)=>{
      if(err) throw err;
      console.log(rows);
      res.render("extras",{rows:rows,user:req.user});
    })
})

Router.post("/extras/delExtra",function(req,res){

	console.log(req.body);

	let sql="DELETE FROM extra where extra.extra_id='"+req.body.item+"' ";
	console.log(sql);
	mysqlConnection.query(sql,function (err,result) {
		if(err){
			res.json({item:req.body.item,done:false})
		}else{
			console.log(result);
		res.json({result:result,done:true,item:req.body.item});
		}

	})
})


Router.get("/extras/addextras",checkk,function(req,res){

    if(req.query.err){
  		console.log("yesss reached");
  		res.render('addextras',{err:true})
  	}else{
  		res.render('addextras',{err:false});
  }

})

Router.post("/extras/addextras",function(req,res){
  let reqBody= req.body;
  console.log(reqBody);
  let sql="INSERT INTO extra VALUES('"+reqBody.extra_id+"','"+reqBody.name+"',"+reqBody.price+",'"+reqBody.type+"');";
  console.log(sql);
  mysqlConnection.query(sql, (err,rows,fields)=>{
    if(err){
      res.redirect("/product/extras/addextras?err=true");
    }
    else{
      console.log(rows);
      res.redirect("/product/extras");
    }
  })
})


Router.get("/extras/viewExtra",function(req,res){
        // console.log("Bhushannnnnn1");
		let extra_id=req.query.extra_id;
	if(extra_id){
		console.log("hii",req.query.update);
		let userObject;
		let sql="SELECT * FROM extra where extra_id='"+extra_id+"'";
		mysqlConnection.query(sql,function(err,result){

			if(err){
          // console.log("Bhushannnnnn3");
				res.redirect("/product/extras");
			} else{

				console.log(result,"hee");
				userObject=result;
				let sellObject;

				let sql1="SELECT YEAR(dely_date),COUNT(YEAR(dely_date)) AS extras_sold,extra.extra_id FROM extra LEFT JOIN orders ON extra.extra_id=Orders.extra_id where extra.extra_id='"+extra_id+"' GROUP BY YEAR(dely_date)";
				mysqlConnection.query(sql1,function(err,result1){

					if(err){
						//res.redirect("/employees");
						console.log("yess error found");
					} else{

						console.log(result1,"hee2");
						sellObject=result1;
						let orderObject;

						let sql2="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.cust_id,Orders.extra_id FROM extra,Orders where extra.extra_id=Orders.extra_id AND extra.extra_id='"+extra_id+"' order by Orders.dely_date desc LIMIT 3";
						mysqlConnection.query(sql2,function(err,result2){

							if(err){
								console.log(err);
								res.redirect("/product/extras");
							} else{

								console.log(result2,"hee3");
								orderObject=result2;
								if(req.query.update==undefined){

									res.render("viewExtra",{userObject:result,orderObject:result1,sellObject:result2,update:false,user:req.user})

								}else if(req.query.update=='error'){

									res.render("viewExtra",{userObject:result,orderObject:result1,sellObject:result2,update:'error',user:req.user});

								} else if(req.query.update=='done'){
									console.log("here");
									res.render("viewExtra",{userObject:result,orderObject:result1,sellObject:result2,update:'done',user:req.user})
								}
							}
						})
					}
				})
			}
		});
	} else{
		res.redirect("/product/extras");
	}
});


Router.post("/extras/updateExtras",function(req,res){

	console.log(req.body);
	let update=req.body;

	if(update){

		let sql="UPDATE extra set extra_id='"+update.extra_id+"',name='"+update.name+"', type='"+update.type+"',price="+update.price+" where extra_id='"+update.where+"'";
		mysqlConnection.query(sql,function(err,result){

			if(err){
				console.log(err);
				//res.redirect("/employees/viewEmployee?emp_id="+update.where+"&&update=error");
				res.json({done:false})
			} else{
				console.log(result);
				sql="SELECT *FROM extra where extra_id='"+update.extra_id+"'";
				mysqlConnection.query(sql,function(err,result1){
					console.log(result1);
					//res.redirect("/employees/viewEmployee?emp_id="+update.emp_id+"&&update=done");
					let update=result1;
					res.json({done:true,update});
				})
			}
		})
	} else{
		res.redirect("/product/extras");
	}
});


Router.get("/extras/viewAllExtras",function(req,res){
		console.log(req.query.extra_id);

		let extra_id=req.query.extra_id;
		let sql2="SELECT Orders.order_id,Orders.car_id ,Orders.date_order,Orders.dely_date,Orders.cust_id,Orders.extra_id FROM extra,Orders where extra.extra_id=Orders.extra_id AND extra.extra_id='"+extra_id+"'";
		mysqlConnection.query(sql2,function(err,result){

			if(err){
				throw err;
			} else{
				console.log(result);
				res.json({result:result});
			}

		})

});



Router.post("/extras/filterextras",function(req,res){
  let reqBody=req.body;
  console.log(reqBody);
  let sql2="SELECT extra.extra_id,extra.name,extra.price,extra.type,COUNT(orders.extra_id) AS extras_sold FROM extra LEFT JOIN orders ON extra.extra_id=orders.extra_id";
  let entered=false;
  let addand=false;
  let checkObject={};
  sql2+=" GROUP BY extra.extra_id";
  if(reqBody.type && reqBody.type!='none')
  {
    if(!entered)
    {
      sql2+=" HAVING(";
      entered=true;
      addand=true;
    }
    sql2+="extra.type='"+reqBody.type+"')";
  }
  if(reqBody.name)
  {
    if(!entered)
    {
      sql2+=" HAVING(";
      entered=true;
      addand=true;
    }
    else
    {
      sql2+=" AND (";
    }
    sql2+="extra.name='"+reqBody.name+"')"
  }
  if(reqBody.sort)
  {
    if(reqBody.sort=="extra_id")
    {sql2+=" ORDER BY extra.extra_id DESC;";}
    else if(reqBody.sort=="price")
    {sql2+=" ORDER BY extra.price DESC;";}
    else
    {sql2+=" ORDER BY extras_sold DESC;";}
    entered=true;
  }
  if(entered){
		console.log(sql2);
		mysqlConnection.query(sql2,function(err,result){
		if(err) throw err;
		console.log(result);
		res.json({checkObject:result,user:req.user});

	});

	}
})

module.exports=Router; //to export the routes
