const orderModel = require('./order.model')

async function create(data){
    return await orderModel.create(data)
}





async function read(filter={}){
     return await orderModel.find(filter)
     .populate('userId')
     .populate('items.itemId')
 }






























async function readOne(filter){
   return await orderModel.findOne(filter)
}


module.exports = {create,read,readOne}



// const starter = async () => {
//     const db = require('./db')
//     await db.connect()

//     let order = await 
//     orderModel
//     .findOne({_id:"65b0d7b434c81d2ea363573d"})
//     .populate('userId')
//     .populate('items.itemId')

//    console.log(order.items);
// }

// starter()



// ********** manual - find items & user *****************
// *******************************************************

// let order = await orderModel.findOne({_id:"65b0dddbb99aaf3669a0db16"})
    
// const userModel = require('./user.model')
// const user = await userModel.findOne({_id:order.userId})

// const itemModel = require('./item.model')
// order.items.forEach(async it=>{
//     const item = await itemModel.findOne({_id:it.itemId})
//     console.log(item);

// })

// console.log(user);



// new order
    // let newOrder = {
    //     userId: "65b0d56150221293cda15058",
    //     items: [{
    //         itemId: "65a7d3ec1a89c6edce167955",
    //         price: 1.89,
    //         amount: 5
    //     }, {
    //         itemId: "65a7d3ec1a89c6edce167960",
    //         price: 5,
    //         amount: 3
    //     }, {
    //         itemId: "65a7d3ec1a89c6edce16796f",
    //         price: 2,
    //         amount: 1
    //     }],
    //     total : 26.45
    // }

    // let res = await orderModel.create(newOrder)