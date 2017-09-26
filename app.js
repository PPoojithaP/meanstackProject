
/**
 * Module dependencies.
 */

//importing modules
var express = require('express');

var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//connect to MongoDB - by passing URL and Port No.
mongoose.connect('mongodb://localhost:27017/contactlist',{ useMongoClient: true });

//On successful connection - to display successful message
mongoose.connection.on('connected',()=>{
	console.log('**Connected to database mongodb on port:27017');
});

//On failure of connection to MongoDB:
mongoose.connection.on('error',(err)=>{
	if(err){
		console.log('Error in DB connection: '+err);
	}
	//console.log('connected to database mongodb on port:27017');
});

// define the port number 
const port = 3000;

//adding middleware-cors
app.use(cors());

//adding body-parser
app.use(bodyparser.json());

//to group all static files at a place- create a folder 'public'
app.use(express.static(path.join(__dirname,'public')));

// to let the user route for the particular function
app.use('/api',route);

// bind server with the port 
app.listen(port,function(){
	console.log('Server started at port: '+port);
});

// testing the server 
app.get('/',function(req,res){
	res.send('foobar');
});
