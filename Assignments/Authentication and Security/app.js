const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
mongoose.connect("mongodb://localhost:27017/secrets");
const tryschema = new mongoose.Schema({
  email: String,
  password: String
});
const secret = "thisislittlesecret.";
tryschema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});

const item = mongoose.model("validation", tryschema);

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res) => {
  res.render("home");
})

app.post("/login", (req, res) => {
  const useremail= req.body.username;
  const userpass= req.body.password;
  item.findOne({email:useremail})
  .then((founduser) =>{
    if(!founduser){
      alert("user not found")
    }
    if(founduser.password === userpass){
      res.render("secret")
    }
    else{
      alert("Enter correct password")
    }
  });
  });
   

app.get("/login", (req, res) => {
  res.render("login");
})

app.post("/register", (req, res) => {
  const newuser = new item({
    email: req.body.username,
    password: req.body.password
  })
  newuser.save()
    .then(() => {
      res.render("secret")

    }).catch(() => {
      console.log("err");
    });
});

app.get("/register", (req, res) => {
  res.render("register");
})

app.listen(3000, () => console.log('Server running on port 3000'));