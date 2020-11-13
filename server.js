const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =process.env.PORT || 3000 
// app.use(express.json());
const { check, validationResult } = require('express-validator');

app.use(express.static('public'));

const urlencodedParser = bodyParser.urlencoded({ extended: false})

const rooms = [];

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
        res.render('createroom',{
            newRoom
        })
    }

})

app.get('/bookroom',(req,res) => {
    res.render('bookroom')
})

app.get('/listallcustomers',(req,res) => {
    res.render('listallcustomers')
})

app.get('/listallbookings',(req,res) => {
    res.render('listallbookings')
})


app.listen(port,function (){
    console.log("listening")
});