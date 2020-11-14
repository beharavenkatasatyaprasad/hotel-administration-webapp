const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
// const methodOverride = require('method-override')
const urlencodedParser = bodyParser.urlencoded({ extended: false})
const { check, validationResult } = require('express-validator');
app.use(express.urlencoded({ extended: false}))
const initializePassport = require('./passport-config')
const port =process.env.PORT || 3000 

const users = []
app.use(express.static('public'));
const rooms = []
const customer_bookings=[];
    
app.set('view engine','ejs');
    
app.get('/',function (req,res){
        // res.render('index');
    res.redirect('/login')
})
    
app.get('/login',(req,res) =>{
    res.render('login');
})
   
app.post('/login',urlencodedParser,[

    check('username' ,"Username Required")
    .notEmpty(),
    
    check('password' ,"Password Required")
    .notEmpty(),
    
    
    ],(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
    const alert = errors.array()
    res.render('login',{
        alert
     })
    }
    else{
        const userlogin = {
            username : req.body.username,
            password : req.body.password
        };
        // console.log(userlogin)
        const successMsg = 'Login Successfull'
        res.render('login',{
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
        // console.log(newuser)
        res.render('register',{
            successMsg
        })
    }
    
})


app.get('/createroom',(req,res) => {
    res.render('createroom')
})

app.post('/createroom',urlencodedParser,[

    check('roomnumber' ,"roomnumber must be at least 3 digits long")
    .notEmpty()
    .isLength({ min: 3 }),
    check('roomname' ,"roomname must be at least 5 chars long")
    .notEmpty()
    .isLength({ min: 5 }),
    check('aminities' ,"atleast one aminity must be selected")
    .notEmpty(),
    check('fare' ,"Fare is required")
    .notEmpty(),
    check('maintenancereport' ,"maintenancereport is required")
    .notEmpty()
    ],(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    const alert = errors.array()
    res.render('createroom',{
        alert
    })
    }
    else{
        const newRoom = {
            id : rooms.length +1,
            roomnum : req.body.roomnumber,
            name : req.body.roomname,
            aminities : req.body.aminities,
            fare : req.body.fare,
            maintenancereport: req.body.maintenancereport
        };
        rooms.push(newRoom);
        console.log(rooms)
        res.render('createroom',{
            newRoom
        })
    }
    
})


app.get('/bookroom',(req,res) => {
    res.render('bookroom',{
        rooms
    })
})

app.post('/bookroom',urlencodedParser,[

    check('roomnum' ,"please select room number")
    .notEmpty(),
    check('custname' ,"Please enter customer name")
    .notEmpty()
],(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        const alert = errors.array()
        res.render('bookroom',{
            alert
        })
    }
    else{
        const newBooking = {
            id : customer_bookings.length +1,
            roomnum : req.body.roomnum,
            custname : req.body.custname,
            check_in : {
                time : req.body.checkin_time,
                date : req.body.checkin_date,
            },
            check_out : {
                time : req.body.checkout_time,
                date : req.body.checkout_date,
            }
        };
        customer_bookings.push(newBooking);
        // console.log(customer_bookings)
        res.render('bookroom',{
            newBooking          
        })
    }
    
})
app.get('/listallrooms',(req,res) => {
    res.render('listallrooms',{
        rooms
    })
})

app.get('/listallbookings',(req,res) => {
    res.render('listallbookings')
})


app.listen(port,function (){
    console.log("listening")
});