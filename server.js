const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');


const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://ashok:ashok@cluster0.0pygyzv.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>{
        console.log("DB connected");
    }
).catch(
   err => console.log(err)
)

// app.get('/',(req,res)=>{
//     res.send("HELLO WORLD!");
// })

app.post('/addtask', async(req,res)=>{
    const {todo} = req.body;
    console.log(req.body);
    try{
        const newData = new TaskSchema({
            todo : todo
        })
        console.log("todo",todo);
        await newData.save();
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})

app.listen(5000,()=>{
    console.log("Server started ....")
})