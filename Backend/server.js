require("dotenv").config()
const express = require("express");
const route = require("./routes/workouts");
const mongoose = require("mongoose")
const app = express();

app.use(express.json());
app.use('/api/workouts',route);
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Listening to port,",process.env.PORT);
    })
})
.catch(()=>{

})
app.use((req,res,next)=>{
console.log(req.path);
console.log(req.method);
next();
})