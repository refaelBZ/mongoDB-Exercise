const express = require('express');
const router = express.Router();

const orderService=require('./order.service');


// Add new odrer

    router.post('/new', async (req, res) => {
        try {
            let newdorder = await orderService.addOrder(req.body);
            if (newdorder) {
                res.send(newdorder);
            }
        } catch (error) {
            res.status(404).send(`Error has occurred: ${error.message}`);
            
        }
    });


module.exports = router;



  
  