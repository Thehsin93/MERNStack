require("dotenv").config()
const express = require("express");
const route = require("./routes/workouts");
const userroute = require("./routes/user")
const mongoose = require("mongoose")

const app = express();

app.use(express.json());
app.use('/api/workouts',route);
app.use('/api/user',userroute);
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Listening to port,",process.env.PORT);
    })
})
.catch((e)=>{
console.log(e)
})
app.use((req,res,next)=>{
console.log(req.path);
console.log(req.method);
next();
})