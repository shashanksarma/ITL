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
  let sql ="SELECT  car_id FROM car_details";
  db.query(sql,function(err,result){
		if(err) throw err;
		// console.log(result);
		
  });
  
});

router.get("/",function(req,res){
	if(req.user){
		let mainObject;
	console.log(req.user);
	let sql ="SELECT orders.order_id,orders.emp_id,orders.date_order,orders.car_id,orders.extra_id FROM orders LEFT JOIN employee ON orders.emp_id=employee.emp_id LEFT JOIN car_details on orders.car_id=car_details.car_id LEFT JOIN extra on orders.extra_id=extra.extra_id GROUP BY orders.order_id order by orders.date_order desc LIMIT 4";
	let check;
	db.query(sql,function(err,result){
    if(err) throw err;
		console.log(result);
		check={mainObject:result};
		res.render('order',{mainObject:result});
	});
	console.log("hi",check);
} else{
	res.redirect('/login');
}
  
});

router.post("/filterorder",function(req,res){

	console.log(req.body,'hi bhushan');
	let reqBody=req.body;
	let checkObject={};
	let sql1="SELECT orders.order_id,orders.emp_id,orders.date_order FROM orders LEFT JOIN employee ON orders.emp_id=employee.emp_id GROUP BY orders.order_id ";
	let entered=false;

	if(reqBody.order_id){
		if(!entered){
			entered=true;
			sql1+="HAVING ("
		} else{
			sql1+="OR (";
		}

		sql1+=" orders.order_id='"+reqBody.order_id+"') ";

	}

	if(reqBody.emp_id){
		if(!entered){
			entered=true;
			sql1+="HAVING ("
		} else{
			sql1+="OR (";
		}
		
		sql1+="orders.emp_id ='"+reqBody.emp_id+"') ";
		
	}

	

	let secondFilter=false;
	if(reqBody.from){
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
		
		sql1+="(orders.date_order>='"+reqBody.from+"') ";
	}

	if(reqBody.upto){
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
		
		sql1+="(orders.date_order<='"+reqBody.upto+"') ";
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
	
});

router.post("/delorder",function(req,res){

	console.log(req.body);

	let sql="DELETE FROM orders where orders.order_id='"+req.body.item+"' ";
	console.log(sql);
	db.query(sql,function (err,result) {
		if(err){
			res.json({item:req.body.item,done:false})
		}else{
			console.log(result);
		res.json({result:result,done:true,item:req.body.item});
		}
		
	});
});



router.get("/getinfoorder",function(req,res){

	

		console.log(req.query.order_id);
		let order_id=req.query.order_id;
		if(emp_id){

			let sql="SELECT * FROM orders LEFT JOIN payment on orders.payment_id=payment.payment_id where orders.order_id='"+order_id+"'";
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



});

router.get("/vieworder",function(req,res){

	if(req.user){

		let order_id=req.query.order_id;
	if(order_id){
		console.log("hii",req.query.update);
		let userObject;
		let sql="SELECT * FROM orders left JOIN payment on orders.payment_id=payment.payment_id left join customer on orders.cust_id=customer.cust_id where orders.order_id='"+order_id+"'";
		db.query(sql,function(err,result){

			if(err){
				res.redirect("/order");
      }
      else{

				console.log(result,"hee");
				userOBject=result;
        if(req.query.update==undefined){

          res.render("vieworder",{userObject:result,update:false})

        }
        else if(req.query.update=='error'){

          res.render("vieworder",{userObject:result,update:'error'});

        } 
        else if(req.query.update=='done'){
          console.log("here");
          res.render("vieworder",{userObject:result,update:'done'})
        }

			}
		});
	} else{

		res.redirect("/order");

	}



} else{

	res.redirect("/login");

}


	

	

});

router.post("/updateOrder",function(req,res){

	console.log(req.body);
	let update=req.body;

	if(update){

		let sql="UPDATE orders set order_id='"+update.order_id+"',emp_id='"+update.emp_id+"',date_order='"+update.date_order+"',dely_date='"+update.dely_date+"',car_id='"+update.car_id+"',extra_id='"+update.extra_id+"',cust_id='"+update.customer_id+"',payment_id='"+update.payment_id+"' where order_id='"+update.where+"'";
		db.query(sql,function(err,result){

			if(err){
				console.log(err);
				res.json({done:false})
			} else{
				let sql1="UPDATE payment set payment_id='"+update.payment_id+"',total_cost="+update.total_cost+",paid_amount="+update.paid_amount+",payment_method='"+update.payment_method+"' where payment_id='"+update.there+"'";
				db.query(sql1,function(err,result1){
					if(err){
						console.log(err);
						res.json({done:false})
					}
					else{
						let sql3="UPDATE customer set cust_id='"+update.customer_id+"',name='"+update.name+"',address='"+update.address+"',phone_no="+update.phone_no+" where cust_id='"+update.here+"'";
						db.query(sql3,function(err,result3){
							if(err){
								console.log(err);
								res.json({done:false})
							}
							else{
				console.log(result1);

				sql="SELECT * FROM orders left join payment on orders.payment_id=payment.payment_id left join customer on orders.cust_id=customer.cust_id where order_id='"+update.order_id+"'";
				db.query(sql,function(err,result2){
					console.log(result2);
					let update=result2;
					res.json({done:true,update});

				})
			}
		

				})


			}

		})

	}
})

	} else{
		
		res.redirect("/order");

	}


});


module.exports=router;