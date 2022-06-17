const { Console } = require('console');
const express = require('express');
const { request } = require('http');
const port = 8000;
const path = require('path');
const Contact = require('../contact_list/models/contact');

const db = require('./config/mongoose');

const ToDo = require('./models/todo_list');

const app = express();

app.set('view engine','ejs');
app.set(path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));





app.get('/delete-list',function(req,res){
        let id = req.query.id;
        ToDo.findByIdAndDelete(id,function(err){
            if(err){
                console.log('error in deleting');
                return;
            }
            return res.redirect('back');
        });
    
})


app.get('/',function(req,res){

    ToDo.find({},function(err,toDo){
        if(err){
            console.log('error in getting contact');
            return;
        }
        
        return res.render('home',{
            title : "ToDoList",
            toDo : toDo
        })
    })
    
})


app.post('/create-todo-list',function(req,res){
    ToDo.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    },function(err,todoList){
        if(err){
            Console.log('Error occured in posting the data');
            return;
        }
        
        return res.redirect('back');
    })
})


app.listen(port,function(err){
    if(err){
        console.log("Error in firing up the server");
        return;
    }
    console.log('my server is up and running on port: ',port);
})