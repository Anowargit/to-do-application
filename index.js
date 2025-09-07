const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

let todos = []

app.get("/",(req,res)=>{
  res.render("index",{todos:todos})
})

app.post("/add",(req,res)=>{
  if(req.body.task==""){ 
    return res.send("Please write something") 
  }
  todos.push({task:req.body.task,priority:req.body.priority})
  res.redirect("/")
})

app.post("/delete",(req,res)=>{
  todos.splice(req.body.index,1)
  res.redirect("/")
})

app.post("/edit",(req,res)=>{
  let i=req.body.index
  todos[i].task=req.body.task
  todos[i].priority=req.body.priority
  res.redirect("/")
})

app.listen(3300)
