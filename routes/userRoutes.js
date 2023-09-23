const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/user_data", async(req, res) =>{
     
    const userdata = req.body;
    const user_id = userdata.user_id;
    
    const exist = await User.findOne({user_id});

    if(exist){

        try {
            const data = await User.findByIdAndUpdate(exist._id, userdata, { new: true });
            res.status(200).send({data});
        } 
        catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    }

    else{
        try {
            const data = await User.create(userdata);
            res.status(201).send({data});
        }
         catch (error) {
          res.status(500).send(error);  
        }
    }
})


router.get("/user_data", async(req, res) =>{

    try {
        const data = await User.find();
        res.status(200).send(data);
    }
     catch (error) {
      res.status(500).send(error);  
    }
})


module.exports = router;