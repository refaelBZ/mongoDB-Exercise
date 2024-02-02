const userModel = require('./user.model')

async function create(data){
    return await userModel.create(data)
}

async function read(filter){
   
   //קוד שנועד לבדיקה בהרצה של סרביס בטרמינל
    let items= await userModel.find(filter)
    console.log(items)
    //קוד סופי
    return await userModel.find(filter)
}

async function readOne(filter){
   return await userModel.findOne(filter)
}

//הפילטר הוא _id
async function updateById(filter, data){
    return await userModel.updateOne(filter, data)
}

async function del(id){
    return await userModel.deleteOne({_id:id})
}

module.exports = {create,read,readOne,updateById,del}


// const starter = async () => {
//     const db = require("./db");
//     db.connect();
//     let newUser = {}
//     let res = await create({
//         fName: "Hopa",
//         lName: "Doe",
//         email: "hooopa@example.com",
//         password: "5436",
//         permission: "admin",
//         isActive: true

//     })
//     console.log(res);
// }
// starter()
