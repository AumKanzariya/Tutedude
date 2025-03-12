const express= require('express')
const bodyParse= require('body-parser')
var app = express(); 

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));


var exa = "working"

var items = [];
app.get("/",function(req,res){
    res.render("list", { ejes: items });
})

app.post("/",function(req,res){
    
    var item = req.body.a1 ;
    items.push(item);
    res.redirect("/");
    
})

app.listen(3000,function(){
    console.log("started");
    
})
