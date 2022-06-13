var dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const connectionstring = process.env.CONNECTIONSTRING
var express = require('express');
var mongoose = require('mongoose');
const initRoutes = require('./routes/candidate.routes');
var path = require('path');
var candidate = require('./models/candidate');
var excelToJson = require('convert-excel-to-json');
var bodyParser = require('body-parser');
var fs = require('fs');


//connect to db  
mongoose.connect(connectionstring, { useNewUrlParser: true })
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err))
    //init app  
var app = express();
//set the template engine  
app.set('view engine', 'ejs');
//fetch data from the request  
app.use(bodyParser.urlencoded({ extended: false }));
initRoutes(app);
//static folder  
app.use(express.static(path.resolve(__dirname, 'public')));
//route for Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
console.log(__dirname + '/public/uploads/');

//assign port  
var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server run at port ' + port));