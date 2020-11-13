const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =process.env.PORT || 3000 
// app.use(express.json());
const { check, validationResult } = require('express-validator');

app.use(express.static('public'));

const urlencodedParser = bodyParser.urlencoded({ extended: false})

const rooms = [
    {
      id: 1,
      roomnum: '602',
      name: 'starindia',
      aminities: [ 'AC', 'cateringservice', 'wifi' ],
      fare: 'Rupees 900/- Only'
    },
    {
      id: 2,
      roomnum: '302',
      name: 'starhood',
      aminities: [ 'AC', 'cateringservice', 'wifi', 'hotwater' ],
      fare: 'Rupees 600/- Only'
    }
  ]
const customer_bookings=[];

app.set('view engine','ejs');

app.get('/',function (req,res){
    res.render('index');
})

app.get('/createroom',(req,res) => {
    res.render('createroom')
})

app.post('/createroom',urlencodedParser,[

    check('roomnumber' ,"roomnumber must be at least 3 digits long")
    .exists()
    .isLength({ min: 3 }),
    check('roomname' ,"roomname must be at least 5 chars long")
    .exists()
    .isLength({ min: 5 }),
    check('aminities' ,"atleast one aminity must be selected")
    .exists(),
    check('fare' ,"Fare must be a number")
    .exists()
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
            fare : "Rupees "+req.body.fare+"/- Only"
        };
        rooms.push(newRoom);
        // console.log(rooms)
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

    // check('roomnum' ,"please select room number")
    // .notEmpty(),
    check('custname' ,"Please enter customer name")
    .notEmpty(),
    check('checkin_date' ,"Please select check-in date")
    .notEmpty(),
    check('checkin_time' ,"Please select check-in time")
    .notEmpty(),
    check('checkout_date' ,"Please select check-out date")
    .notEmpty(),
    check('checkout_time' ,"Please select check-out time")
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