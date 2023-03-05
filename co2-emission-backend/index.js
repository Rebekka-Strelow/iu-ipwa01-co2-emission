

const express = require('express'); //Import the express dependency
var favicon = require('serve-favicon');
var path = require('path');
var controller = require('./src/controller')

const app = express();              //Instantiate an express app, the main work horse of this server
const port = 8081;                  //Save the port number where your server will be listening

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico'))); //favicon eingebunden

console.log(controller.getCountryFilters());
console.log(controller.getCompanyFilters());

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser                                                    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});