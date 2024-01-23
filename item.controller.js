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

async function update(){}
async function del(){}

module.exports = {create,read,readOne,update,del}