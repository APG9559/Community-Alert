const express = require('express')
const Alert = require('../models/alert.js')
require('dotenv').config()
const mongoose = require('mongoose')

const router = express.Router()

router.get('/loadAlerts', async(req,res) =>{

    console.log(req.query)
   
    const lat = parseFloat(req.query.lat)
    const long = parseFloat(req.query.lng)
    // console.log(lat)
    // console.log(long)
    const alerts = await Alert.find()
    // const alerts = await Alert.find({'$and' :[{'active' : true} , {'$or' : [ { '$and' : [ {'latitude' : {$gte : lat - 0.1} }, {'latitude' : {'$lte' : lat + 0.1} }] }  , { '$and' : [ {'longitude' : {$gte : long - 0.1} }, {'longitude' : {'$lte' : long + 0.1} }] } ]}] })

    console.log(alerts)
    res.status(200).json(alerts)

    return res;
})

router.get('/alert',async (req,res) =>{
    
    alerts = await Alert.find();
    console.log('alert getting')
    console.log(res)
    res.status(200)
    res.status(200).json(alerts)
    return res
})  

router.put("/alput" , async (req , res)=>{

await Alert.FindOneAndUpdate({_id:req.params.userid} , )
})

router.post('/alert',async (req,res) =>{
   const {title , description, type , latitude, longitude ,postedBy} = req.body
    await Alert.create(req.body);
    console.log(req.body)
    console.log('alert added')
    res.status(200).json({message : "hello added"})
})

router.put('/alert',(req,res)=>{
    console.log('alert updated')
})

router.get('/verifyAlerts', async (req,res)=>{
    
    console.log(req.query)
   
    const lat = parseFloat(req.query.lat)
    const long = parseFloat(req.query.lng)
    // console.log(lat)
    // console.log(long)
    const alerts = await Alert.find()
    // const alerts = await Alert.find({'$and' :[{'active' : true} , {'$or' : [ { '$and' : [ {'latitude' : {$gte : lat - 0.1} }, {'latitude' : {'$lte' : lat + 0.1} }] }  , { '$and' : [ {'longitude' : {$gte : long - 0.1} }, {'longitude' : {'$lte' : long + 0.1} }] } ]}] })

    console.log(alerts)
    res.status(200).json(alerts)
    // res.json({message : " hello "})
    return res;
})



module.exports = router;