const express = require('express')
const Alert = require('../models/alert.js')
const router = express.Router()

router.put('/community/updateAlert', async (req,res) =>{
  await Alert.findOneAndUpdate(req._id, {'verified' : true})
  res.status(200).json({message : "OKAY"})
})

router.post('/community/addAlert', async (req,res)=>{

  req.body.verified = true;

  await Alert.create(req.body)
  .then( ()=>{
    res.status(200).json({message : "Alert Added"})
  }).catch( ()=>{
    res.status(400).json({message : "internal Server Error"})
  })
})



module.exports = router;