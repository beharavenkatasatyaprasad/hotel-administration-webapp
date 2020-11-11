const express = require('express');
const app = express();
const port =process.env.PORT || 3000 
// app.use(express.json());
const server = require('http').Server(app);
app.use(express.static('public'));


app.set('view engine','ejs');

app.get('/',function (req,res){
    res.render('index');
})

server.listen(3000,function (){
    console.log("listening")
});