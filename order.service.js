const orderController=require("./order.controller")

const itemController=require("./item.controller")

const userController=require("./user.controller")








//add new order
// async function addOrder(newOrder) {
    


//     const filter = { email: newOrder.email };
//     let isExist=await orderController.readOne(filter);

//     if (!isExist) {
//         return await orderController.create(newOrder);
//     } else {
//         return { success: false, message: "Product not found" };
//     }
// }



//add new order
//TODO: this func doesnt work
async function addOrder(data) {
    if (!data.userId) throw { code: 404, msg: "user id missing" };
    // ממי הוא מקבל >>>> מה הוא מקבל
    // בדיקות

    // - האם יוזר קיים
    let user = await orderController.readOne({ userId: data.userId })
    if (!user) throw { code: 404, msg: "user is not exist" }

    let values = Object.values(data.items)
    // - האם יש מוצרים בהזמנה
    if (!data.items || !values.length) throw { code: 404, msg: "items empty" }

    // - כמות > 0 
    if (values.some(v => v <= 0)) throw { code: 404, msg: "value 0" }

    let total = 0;

    // מוצר קיים?
    for (let item of data.items) {
        let itemFromDB = await itemController.readOne({ _id: data.itemId });

        if (!itemFromDB) throw { code: 404, msg: "product does not exist" };

        // מחיר מוצר
        item.price = itemFromDB.price; // עדכון המחיר ממסד הנתונים

        // חישוב הסה"כ
        total += item.price * item.amount;
    }

    // מיפוי כל המידע לתצורת הסכמה 
    let newOrder = {
        userId: data.userId,
        items: data.items,
        total: total,
        orderDate: new Date()
    };

    //  יצירת הזמנה ב-DB
    if (user && data.items) {
        await orderController.create(newOrder);

        // לעדכן את רשימת ההזמנות בתוך היוזר במזהה של ההזדמנה חדשה
        await userController.addUserOrder(data.userId, newOrder._id);
        // החזרת תשובה
        return newOrder;
    } else {
        return { success: false, message: "Error has occured" };
    }


}


async function getUserOrders(id) {
    
    const filter={userId: id}
    let orders=await orderController.read(filter)
    return orders;
}



async function getOrdersTotal(id) {

    const filter = { userId: id };
    let orders = await orderController.read(filter);
    let totalSum = 0;
    orders.forEach(order => {totalSum += order.total});
    // console.log(totalSum);
    return totalSum;
}

//TODO: לא עובד, מחזיר תוצאה אפס
//get total orders of specific item
async function getTotalOrder(id) {

    const filter={}
    const allOrders = await orderController.read(filter);
    
    let totalQuantity = 0;
    allOrders.forEach(order => {
        order.items.forEach(item => {
            if (item.itemId === id) {
                totalQuantity += item.amount;
            }
        });
    });

    console.log( "total: "+ totalQuantity);
    return totalQuantity ;
}









    //קריאה לפונקציה מסוימת, לצורך בדיקה בטרמינל
    getTotalOrder("65a7d48eeee2da26f8087f16")


module.exports = {addOrder, getUserOrders, getOrdersTotal,getTotalOrder };



// const starter = async () => {
//     const db = require('./db')
//     await db.connect()

//     let order = await 
//     orderModel
//     .findOne({_id:"65b0d56150221293cda15058"})
//     .populate('userId')
//     .populate('items.itemId')

//    console.log(order.items);
// }
// starter()