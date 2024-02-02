const itemModel = require('./item.model')



async function create(data){
    return await itemModel.create(data)
}


async function read(filter){
   
   //קוד שנועד לבדיקה בהרצה של סרביס בטרמינל
    let items= await itemModel.find(filter)
    console.log(items)
    //קוד סופי
    return await itemModel.find(filter)
}

async function readOne(filter){
   return await itemModel.findOne(filter)
}

//הפילטר הוא _id
async function updateById(filter, data){

    let item= await itemModel.updateOne(filter, data)
    console.log(item)

    return await itemModel.updateOne(filter, data)
}

async function del(id){
    return await itemModel.deleteOne({_id:id})
}

module.exports = {create,read,readOne,updateById,del}

