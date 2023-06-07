//require the library
const mongoose=require('mongoose');
//connect to database
mongoose.connect('mongodb://127.0.0.1/test_db');
//to check if tis successfull
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'error connecting to db'));
//running
db.once('open',function(){
    console.log("successfully connected to DB");
})