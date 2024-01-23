const express = require('express')
const router = express.Router()

// get all items
router.get('/item',function(req,res){
    
})

// get single item
router.get('/item/:id',function(req,res){})

router.post('/item',(req,res)=>{}) 

router.delete('/item/:id',(req,res)=>{}) 
router.put('/item/:id',(req,res)=>{}) 

module.exports = router