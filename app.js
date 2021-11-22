const express = require ( 'express' );


// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 
//const Users= require('Users.json');
app.set("view engine", "ejs");
const alert= require('alert');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true})); 
require("dotenv").config();


// db connections.
const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost:27017/testdb', 
                  { useNewUrlParser: true, useUnifiedTopology: true });


 // create a schema
const Users = new mongoose.Schema( { 
  name: String,
  password: String
});

const User = mongoose.model('Users', Users);

const Tasks = new mongoose.Schema( { 
  
  
    _id: Number,
    text:String,
    state:String,
    creator: String,
    isTaskClaimed: Boolean,
    claimingUser: String,
    isTaskDone :Boolean,
    isTaskCleared : Boolean


});
const Task = mongoose.model('Tasks', Tasks);


// a common localhost test port
const port = 3000;


app.get('/', (req, res)=> {

    res.sendFile(__dirname + "/Login.html");
  });

// validating login form.
app.post("/login", (req, res) => {
  //check for valid inputs
  if(req.body.username || req.body.pswd){
  //compare user and pass in db
    
    User.findOne({name: req.body.username},(error, user)=>{
    
      console.log(user);
      if(user){
        if(user.password=== req.body.pswd){
             //if user registered then 
          //go to todo page
         
        res.render('Todo',{name: user.name});
        }else{
          console.log("password doesnt match");
          alert("password doesnt match ");
        }

       

      }else{
       
        alert("try again ");
      }
    });
    
  }else{
    alert("try again with proper value");;
  }
});

//valdating register form
app.post("/register", (req, res) => {


  if(req.body.authentication==="todo2021"){

    var AreadyUserCHechk= req.body.username;
    console.log(AreadyUserCHechk);
    //check db for same username
    User.findOne({name: AreadyUserCHechk},(error, user)=>{
      console.log(user);
      if(user){
          //if db has already user alert try again
          res.redirect('/');
        alert("try again with different username");;

      }else{
        //add user to the db
        const Users = new User({
          name: req.body.username,
          password: req.body.pswd
        });
        Users.save();
      res.render('Todo',{name:name});
      }
    });
  }else{
    
    alert("try again with authentication [todo2021]");
  }
 
});

//add task to db
app.get('/add', (req, res)=> {

  const task = new Task({
    text:req.body.textAddValue,
    state:"active",
    creator: "user",
    isTaskClaimed: false,
    claimingUser: null,
    isTaskDone :false,
    isTaskCleared : false
  });
  task.save();
 
} );


app.get('/view/Todo.ejs', (req, res)=> {

    res.redirect('/');
   
} );


// Simple server operation
app.listen (port, () => 
    // template literal
    console.log (`Server is running on http://localhost:${port}`));

