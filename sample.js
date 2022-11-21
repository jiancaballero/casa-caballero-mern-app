const express = require("express");
const router = express.Router();
const app = express();
const Item = require("../ItemModel");
const ItemRoute = router.delete('/:id',(req,res)=>{
    
  try {
    Item.deleteOne()
    taskCollection.save().then(data=>{
        res.status(200).send(data)
    })
    
  } catch (error) {
    res.status(500).send(error)
  }
  
}) 
app.use('/api/user',taskRoute);
