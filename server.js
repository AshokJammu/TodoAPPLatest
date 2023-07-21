const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskSchema = require('./model')

const app = express();
mongoose.connect('mongodb+srv://ashok:ashok@cluster0.0pygyzv.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>{
        console.log("DB connected");
    }
).catch(
    err => console.log(err,"DB connection error")
)

app.use(express.json());
app.use(cors({
    origin:'*'
}))

app.get('/',(req,res)=>{
    res.send("Hello World!");
})

app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo:todo
        })
        await newData.save();
        return res.json(await TaskSchema.find())
    }catch(err){
        console.log(err,"error in addtask")
    }
})

app.get('/gettask',async(req,res)=>{
    try{
        return res.json(await TaskSchema.find())
    }catch(err){
        console.log(err,"Error in gettask")
    }
})

app.delete(`/delete/:id`,async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id)
        return res.json(await TaskSchema.find())
    }catch(err){
        console.log(err,"error in delete")
    }
})

app.listen(5000,()=>{
    console.log("Server started ....");
})