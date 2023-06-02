const express= require('express');
const path=require('path');
const port=8000;
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
app.get('/',function(req,res){
    return res.render('home',{title:"Contact list",contact_list:contactList});
});


app.get('/practice',function(req,res){
    return res.render('main',{title:"demo"});
});

app.get('/delete-contact/:phone',function(req,res){
    console.log(req.params);
    let phone=req.params.phone;
    let contact_Index=contactList.findIndex(contact=>contact.phone==phone);
    if(contact_Index!=-1){
        contactList.splice(contact_Index,1); 
    }
    return res.redirect('/')
})

app.post('/createList',function(req,res){
    contactList.push({
        naam:req.body.naam,
        phone:req.body.phone
    });
    return res.redirect('/');
});


app.listen(port,function(err){
    if(err){
        console.log('error in running');
    }
    else{
        console.log('running: ',port);
    }
})