const mongoose = require('mongoose')
require('./item.model')
require('./user.model')

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },
    items: [{
        itemId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "item",
            required: true
        },
        price: {
            type: Number
        },
        amount: {
            type: Number
        }
    }],
    total: {
        type: Number,
    },
})
const orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel;




// const starter = async () => {
//     const db = require('./db')
//     await db.connect()

//     let newOrder = {
//         userId: "65b0d56150221293cda15058",
//         items: [{
//             itemId: "65a7d48eeee2da26f8087f16",
//             price: 7,
//             amount: 1
//         }, {
//             itemId: "65a7d48eeee2da26f8087f16",
//             price: 6,
//             amount: 1
//         }, {
//             itemId: "65a7d48eeee2da26f8087f16",
//             price: 2,
//             amount: 8
//         }],
//         total: 5435
//     };

//     let res = await orderModel.create(newOrder);
//     console.log(res); // הדפסת התוצאה לבדיקה
// };

// starter();