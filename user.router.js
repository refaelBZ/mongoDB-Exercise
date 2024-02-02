const express = require('express');
const router = express.Router();

const userService=require('./user.service');

//עבור ההזמנות
const orderService=require('./order.service');



// Get all users
router.get('/', (req, res) => {
        res.send(userService.gettAllusers());
});

// Get single user
router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id)
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(404).send(error);
    }
});


// Get user orders
router.get('/orders/:id', async (req, res) => {
    try {
        const user = await orderService.getUserOrders(req.params.id)
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(404).send(error);
    }
});






// Search user by name
router.get('/search/:name', (req, res) => {
    res.send("Search user by name");
});

// Add new user
// router.post('/', (req, res) => {
    
    
//         let newdUser = userService.addUser(req.body);
//     if (newdUser) {
//         res.send(newdUser);
//     } else {
//         res.status(404).send("Error! user already exists");
//     }});
    
    router.post('/', async (req, res) => {
        try {
            let newUser = await userService.addUser(req.body);
            if (newUser) {
                res.send(newUser);
            }
        } catch (error) {
            res.status(404).send("Error! user already exists")
        }
    });

    




// Delete user
router.delete('/:id', (req, res) => {
    
    let isExist = userService.deleteUser(req.params.id);
    
    if (isExist)
    {
        res.send("User deleted");
    } else
    {
        res.status(404).send("User not found");
    }
});



//update user
router.put('/:id', async (req,res)=>{
    try{
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.send(updatedUser); }
    }catch (error) {

        res.status(404).send("User not found");
    }
})


// // Update user old version
// router.put('/:id', (req, res) => {

//     let updatedUser = userService.updateUser(req.params.id, req.body);
//     if (updatedUser) {
//         res.send(updatedUser);
//     } else {
//     }});

module.exports = router;






