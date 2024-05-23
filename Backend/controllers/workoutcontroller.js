const { default: mongoose } = require("mongoose");
const Workout = require("../models/workout")


const workout_getall= async(req,res)=>{
    
    try{
        const workout =await Workout.find({}).sort({createdAt:-1});
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({error:error.msg})
    }
    
}
const workout_getone= async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error:"no such workout"})
    try{
        
        const workout =await Workout.findById(id);
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({error:error.msg})
    }
    
}
const workout_post= async(req,res)=>{
    let emptyfields = [];
    const{title,reps,load} = req.body;
    if(!title)
        emptyfields.push("title");
    if(!reps)
        emptyfields.push("reps");
    if(!load)
        emptyfields.push("load");
    if (emptyfields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyfields })
      }
    try{
        const workout =await Workout.create({title,reps,load});
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({error:error.msg})
    }
  
}
const workout_patch= async(req,res)=>{
    const{id} = req.params;
    try{
        const workout =await Workout.findOneAndUpdate({_id:id},{...req.body});
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({error:error.msg})
    }
 
}
const workout_delete= async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error:"no such workout"});
    try{
        const workout =await Workout.findOneAndDelete({_id:id});
        if(!workout)
            return res.status(400).json({error:"no such workout"});
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({error:error.msg})
    }
  
}
module.exports ={
    workout_getall,
    workout_getone,
    workout_post,
    workout_patch,
    workout_delete
}