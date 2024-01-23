const express = require('express');
const router = express.Router();

const userService=require('./user.service');


// Get all users
router.get('/', (req, res) => {
        res.send(userService.gettAllusers());
});

// Get single user
router.get('/:id', (req, res) => {

    let user = userService.getUser(req.params.id)
    if (user) {
        res.send(user);
    } else {
        res.status(404).send("User not found");
    }
});


// Search user by name
router.get('/search/:name', (req, res) => {
    res.send("Search user by name");
});

// Add new user
router.post('/', (req, res) => {
    
    
        let newdUser = userService.addUser(req.body);
    if (newdUser) {
        res.send(newdUser);
    } else {
        res.status(404).send("Error! user already exists");
    }});
    


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


// Update user
router.put('/:id', (req, res) => {

    let updatedUser = userService.updateUser(req.params.id, req.body);
    if (updatedUser) {
        res.send(updatedUser);
    } else {
        res.status(404).send("User not found");
    }});

module.exports = router;


