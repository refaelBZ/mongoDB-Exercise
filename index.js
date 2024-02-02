const express=require('express')
const app = express()

const db= require("./db");
db.connect();

const cors=require('cors');
app.use(cors());
app.use(express.json());

const userRouter = require('./user.router')
app.use("/user", userRouter)

const orderRouter = require('./order.router')
app.use("/order", orderRouter)

const itemRouter = require('./item.router')
app.use("/item", itemRouter)


app.listen(2509, ()=>console.log('server is up!!!'));









