const express = require("express")
const bodyparser = require("body-parser")
var app = express();

app.set('view engine', "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require("mongoose");
const { log, forEach } = require("async");
mongoose.connect("mongodb://localhost:27017/todo");

const todoschema = mongoose.Schema({
    name: String
});

const item = mongoose.model("task", todoschema);

app.get("/", (req, res) => {
    item.find({})
        .then((founditem) => {
            res.render("list", { dayej: founditem });

        })
        .catch((err) => {
            console.log("Error fetching tasks:", err);
        });

});
app.post("/delete", (req, res) => {
    const checkedId = req.body.checkbox1; // Checkbox से task का ID मिलेगा

    console.log("Deleting ID:", checkedId); // Debugging के लिए

    if (checkedId) {
        item.findByIdAndDelete(checkedId)
        .then(()=>{
            console.log("deleteed");
            res.redirect("/");
        })
        .catch((err) =>{
            console.log(err);
            
        })

}else{res.redirect("/")};

});


app.post("/", (req, res) => {
    const itemname = req.body.a1;
    const todo = new item({
        name: itemname
    });
    todo.save();
    res.redirect("/");
});


app.listen("3000", function () {
    console.log("server running");

});