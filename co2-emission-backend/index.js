

const express = require('express'); //Import the express dependency
const cors = require('cors');
var favicon = require('serve-favicon');
var path = require('path');
var controller = require('./src/controller') //Importiere den Controller, der die Daten aus der JSON-Datei filtert und ließt

const app = express();              //Instantiate an express app, the main work horse of this server
const port = 8081;                  //Save the port number where your server will be listening

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico'))); //favicon eingebunden
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
console.log(controller.getCountryFilters());
console.log(controller.getCompanyFilters());


//############## REST SCHNITTSTELLEN ################
//Landingpage, falls jemand das Backend direkt aufruft
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

//Sende die Daten der Tabelle an sich ans Frontend
app.get('/data', (req, res) => { 
    return res.send(Object.values(controller.getJSONData()));
})

//Sende eine Liste aller Länder an das Frontend
app.get('/countries', (reg, res) => { 
    return res.send(controller.getCountryFilters());

})

//Sende eine Liste aller Unternehmen an das Fronend
app.get('/companies', (reg, res) => { 
    return res.send(controller.getCompanyFilters());

})

//Resette die Daten
app.get('/resetData', (reg, res) => { 
    controller.resetData();
    return res.sendStatus(200);
})

//Resette de Filter
app.get('/resetFilters', (reg, res) => { 
    controller.resetFilters();
    return res.sendStatus(200);
})


// ############### REST SCHNITTSTELLLEN ENDE ##############

//Ausloggen von Serverstart erfolgreich
app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});