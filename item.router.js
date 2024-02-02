const express = require('express')
const router = express.Router()
const itemService=require('./item.service');


// get all items
router.get('/item',function(req,res){
    
})



//add new item
// router.post('/', (req, res) => {

//     try{
//         console.log(req.body);
//         const newItem = itemService.addItem(req.body);
//         if (newItem) {
//             res.send(newItem);
//         console.log(newItem); }
//     }catch (error) {

//         res.status(404).send(error);

//     }
// });


//add new item

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newItem = await itemService.addItem(req.body);
        if (newItem) {
            res.send(newItem);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



//update item
router.put('/:id', async (req,res)=>{
    try{
        const item = await itemService.updateItem(req.params.id, req.body);
        if (item) {
            res.send(item); }
    }catch (error) {

        res.status(404).send(error);
    }
})


//get items by category

router.get('/categories/:categoryName', async (req,res)=>{
    try{
        const category = await itemService.getByCategory(req.params.categoryName);
        if (category) {
            res.send(category); }
    }catch (error) {

        res.status(404).send(error);
    }
})
 



//get item
router.get('/singleItem/:id', async (req, res) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        if (item) {
            res.send(item);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(404).send(error);
    }
});




// get single item
router.delete('/item/:id',(req,res)=>{}) 

module.exports = router






  
  