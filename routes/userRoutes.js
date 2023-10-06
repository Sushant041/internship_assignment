const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/user_data", async(req, res) =>{
     
    const userdata = req.body;
    const user_id = userdata.user_id;
    const api = process.env.APIKEY;
    const ifsc = userdata.back_accounts[0];

    try {     
        const response1 = await fetch("https://ifsc.razorpay.com/" + ifsc);
        const b_data = await response1.json();

        const response2  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${b_data.CITY}&appid=${process.env.APIKEY}&units=metric`)
        const w_data = await response2.json();

        const accounts = {
            "bank": b_data.BANK,
            "branch": b_data.BRANCH,
            "address": b_data.ADDRESS,
            "city": b_data.CITY,
            "district": b_data.DISTRICT,
            "state": b_data.STATE,
            "bank_code": b_data.BANKCODE,
            "weather": {
                "temp": w_data.main.temp,
                "humidity": w_data.main.humidity
            }
        }

        userdata.accounts = accounts;

     } catch (error) {
        console.error(error);
    }
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