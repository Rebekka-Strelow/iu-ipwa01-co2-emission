//Imports
const express = require('express');
const cors = require('cors');
var favicon = require('serve-favicon');
var path = require('path');
var controller = require('./src/controller')

//Express-App initialisieren
const app = express();             
const port = 8081;               

//Icon einbinden
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico'))); 

//CORS erlauben für Localhost
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


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