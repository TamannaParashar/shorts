import mongoose from "mongoose";
const url = process.env.MONGODB_URL;
if(!url){
    throw new Error("mongodb url not found")
}
mongoose.connect(url);
const db = mongoose.connection;
db.on('connected',()=>{
    console.log("Connected to database")
})
db.on('disconnected',()=>{
    console.log('not connected to database')
})
db.on("error",(err)=>{
    console.log('Got an error',err)
});

export default db;