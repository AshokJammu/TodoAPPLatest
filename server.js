const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb+srv://ashok:ashok@cluster0.0pygyzv.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>{
        console.log("DB connected");
    }
).catch(
   err => console.log(err)
)


app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.get('/',(req,res)=>{
    res.send("HELLO WORLD!");
})

app.post('/addtask', async(req,res)=>{
    const {todo} = req.body;
    console.log(req.body);
    try{
        const newData = new TaskSchema({
            todo : todo
        })
        console.log("todo",todo);
        await newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err);
    }
})

app.get('/gettask',async (req,res)=>{
    try{
        return res.json(await TaskSchema.find())
    }catch(err){
        console.log(err,"error in get task")
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find())
    }catch(err){
        console.log(err,"delete by ID")
    }
})

app.listen(5000,()=>{
    console.log("Server started ....")
})