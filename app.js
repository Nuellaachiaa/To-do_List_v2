const express = require("express"); 

const bodyParser = require("body-parser");


const app = express();


var items = [];
var workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
   
   var today = new Date();
   var options = {
      weekday: "long",
      day : "numeric",
      month : "long"
   };
   
   var day = today.toLocaleDateString("en-US", options);
   
   
   
   
   res.render("list", {listTitle: day, newListItems: items})
});

app.post("/", function (req, res) {
   let item = req.body.newItem;

   if (req.body.list === "Work") {
      workItems.push(items);
      res.redirect("/work");
   } else {
      items.push(item);

      res.redirect("/");
   }
});
   

app.get("/work", function (req, res) {
   res.render("list", {listTitle: "WorkList", newListItems: workItems})
})

app.post("/work", function (req, res) {
   let item = req.body.newItem;

   workItems.push(item);

   res.redirect("/work");
})

app.get("/about", function (req, res) {
   res.render("about");
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});