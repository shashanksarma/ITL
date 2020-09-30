const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",function(req,res){

	res.sendFile(path.join(__dirname,"./public","/MainTemplate.html"));

})

app.listen(8000,function(){
	console.log("server is responding on port 8000");
})