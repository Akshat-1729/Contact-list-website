const express= require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
var contactList=[
    {
        naam:"Akshat",
        phone:"8267834"
    },
    {
        naam:"ron",
        phone:"77777"
    },
    {
        naam:"maeve",
        phone:"241341"
    },
    {
        naam:"tara",
        phone:"34521"
    }
];
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded());
app.use(express.static('assets'))
// middleware1
// app.use(function(req,res,next){
//     req.myname="akshat";
//     next();
// });
// middleware2
// app.use(function(req,res,next){
//     console.log("my name from mw2:",req.myname);
//     next();
// });
app.get('/', function(req, res) {
    Contact.find({})
      .then(function(contacts) {
        return res.render('home', { title: "Contact list", contact_list: contacts });
      })
      .catch(function(err) {
        console.log('error in fetching contacts from db', err);
        return;
      });
  });
  
  


app.get('/practice',function(req,res){
    return res.render('main',{title:"demo"});
});

app.get('/delete-contact', function(req, res) {
    console.log(req.params);
    let id = req.query.id;

    Contact.findByIdAndDelete(id)
        .then(function() {
            return res.redirect('/');
        })
        .catch(function(err) {
            console.log("Can't delete from db", err);
            return;
        }); 
});

app.post('/createList', function(req, res) {
    Contact.create({
      name: req.body.naam,
      phone: req.body.phone
    })
      .then(newContact => {
        console.log('*********', newContact);
        return res.redirect('back');
      })
      .catch(err => {
        console.log("error in creating a contact", err);
        return res.redirect('back');
      });
  });
  


app.listen(port,function(err){
    if(err){
        console.log('error in running');
    }
    else{
        console.log('running: ',port);
    }
})