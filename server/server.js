const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose")
const port = process.env.PORT || 3001;
const inventoryController = require("./routes/inventory")
const customerController = require("./routes/customer")
const orderController = require("./routes/order");
const inventory_model = require("./Modals/inventory_modal");
const methodOverride = require("method-override");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.set("view engine","ejs")
app.listen(port, (req, res) => {
    console.log(`server started at ${port}`);
});

mongoose.connect("mongodb://localhost/api_web_tech_assignmnet", (data)=>{
    console.log("Database is connected succesfully")
}, (err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    // inventory_model.find().then((data)=>{
    //     res.render("data", data)
    // })
    res.status(200).send("Inventory")
})

app.use("/inventory", inventoryController)
app.use("/user", customerController)
app.use("/add", orderController)