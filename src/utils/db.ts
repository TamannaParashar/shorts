import mongoose from "mongoose";
const url = "mongodb://localhost:27017/shorts";
mongoose.connect(url);
const db = mongoose.connection;
db.on('connected',()=>{
    console.log("Connected to database")
})
db.on('disconnected',()=>{
    console.log('not connected to database')
})
db.on("error",(err)=>{console.log('Got an error'),err});

export default db;