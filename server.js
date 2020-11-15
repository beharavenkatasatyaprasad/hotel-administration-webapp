const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt')
const urlencodedParser = bodyParser.urlencoded({ extended: false})
const { check, validationResult } = require('express-validator');
const port =process.env.PORT || 3000 

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}))

const users = []
const rooms = []
const customer_bookings=[];
app.set('view engine','ejs');
    
app.get('/',function (req,res){
    res.redirect('/login')
})
    
app.get('/login',(req,res) =>{
    res.render('login');
})
   
app.post('/login',(req,res) => {
    var { username, password } = req.body;
    var err;
    if (!username || !password ) {
        err = "Please Fill All The Fields...";
        res.render('login', { 'err': err });
    }else{const loginreq = {
            id : rooms.length +1,
            username : req.body.username,
            password : req.body.password
        };
        console.log(loginreq)
        const successMsg = 'New Room Added Successfully'
        res.render('createroom',{
            successMsg
        })
}
})

app.get('/register',(req,res) =>{
    
       res.render('register')
    })
    
app.post('/register',urlencodedParser,[

    check('username' ,"Username Required")
    .notEmpty(),
    
    check('password' ,"Password Required")
    .notEmpty(),
    
    ],(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
    const alert = errors.array()
    res.render('register',{
        alert
     })
    }
    else{
        const newuser = {
            username : req.body.username,
            password : req.body.password
        };
        users.push(newuser);
        const successMsg = 'Registration Successfull'
        res.render('register',{
            successMsg
        })
    }
    
})


app.get('/createroom',(req,res) => {
    res.render('createroom')
})

app.post('/createroom',(req, res) => {
    
    var { roomnum, roomname, aminities, fare } = req.body;
    var err;
    if (!roomnum || !roomname || !aminities || !fare) {
        err = "Please Fill All The Fields...";
        res.render('createroom', { 'err': err });
    }else{const newRoom = {
            id : rooms.length +1,
            roomnum : req.body.roomnum,
            name : req.body.roomname,
            aminities : req.body.aminities,
            fare : req.body.fare,
        };
        rooms.push(newRoom);
        const successMsg = 'New Room Added Successfully'
        console.log(rooms)
        res.render('createroom',{
            successMsg
        })
    }
    
})


app.get('/bookroom',(req,res) => {
    res.render('bookroom',{
        rooms
    })
})

app.post('/bookroom',(req,res) =>{

    var { roomnum, customername, checkin_date, checkin_time, checkout_date, checkout_time} = req.body;
    var err;
    if (!roomnum || !customername || !checkin_date || !checkin_time || !checkout_date || !checkout_time) {
        err = "Please Fill All The Fields...";
        res.render('bookroom', { 'err': err });
    }else{
        const newBooking = {
            id : customer_bookings.length +1,
            roomnum : req.body.roomnum,
            name : req.body.roomname,
            aminities : req.body.aminities,
            fare : req.body.fare,
        };
        customer_bookings.push(newBooking);
        const successMsg = 'Booking Successful'
        res.render('bookroom',{
            successMsg
        })
    }
    
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard');
})

app.get('/logout',(req,res)=>{
    res.redirect('login');
})

app.listen(port,function (){
    console.log("listening")
});
