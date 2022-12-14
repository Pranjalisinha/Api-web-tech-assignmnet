const express = require("express");
const inventory_model = require("../Modals/inventory_modal");
const order_modal = require("../Modals/order_modal")
const router = express.Router();


router.post("/item", (req, res)=> {
    inventory_model.find({ inventory_type: req.body.inventory_type, item_name: req.body.item_name  }).then((data) => {
        if (data.length) {
            const quantity=(data[0].available_quantity)+(req.body.available_quantity)
            inventory_model.updateOne({ inventory_id: req.body.inventory_id },{$set: {available_quantity:quantity}}).then((data)=>{
                res.status(200).send(`Inventory Added Sucessfully`)
            }).catch((err) => {
                res.status(400).send(err.message)
            })
             } else {
            inventory_model.create({
            item_name:req.body.item_name,
            inventory_type:req.body.inventory_type,
            available_quantity:req.body.available_quantity
            }).then((data)=>{
                res.status(200).send(`New Inventory added successfully`)
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        }
    }).catch((err) => {
        res.status(400).send(err.message)
    })
});
router.get("/electronics", (req, res)=>{
    inventory_model.find().then((data)=>{
        let arr = [];
        for(let i=0; i<data.length; i++){
        if(data[i].inventory_type === "Electronics" ){
            arr.push(data[i]);
        }
    }
    res.status(200).send(arr);
    })
})
router.get("/furniture", (req, res)=>{
    inventory_model.find().then((data)=>{
        let arr = [];
        for(let i=0; i<data.length; i++){
            if(data[i].inventory_type === "Furniture" ){
                arr.push(data[i]);
            }
        }
        res.status(200).send(arr);
    })
})

router.get("/viewItem", (req, res)=>{
    inventory_model.find().then((data)=>{
        res.status(200).send(data);
    })
})
module.exports = router;