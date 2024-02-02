const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fName:{
        type:String,
        required : true
    },
    lName : {
        type:String,
        required:true
    },
    email : {
        type:String,
        unique:true,
        required : true
    },
    password : {
        type:String,
        select: false //מונה החזרת הסיסמה
    },
    permission: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' // אם יש לך מודל בשם 'Order' להזמנות
    }],
    createdDate:
    {
        type:Date,
        default: Date.now// כאן לא להפעיל את הפונקציה, כדי שבכל פעם הוא ייתן את התאריך העדכני
    },
    isActive : {
        type:Boolean,
        default: true
    }
})
const userModel = mongoose.model('user',userSchema)




module.exports = userModel;
