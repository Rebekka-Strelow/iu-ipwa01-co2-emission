//Imports
const express = require('express');
//const cors = require('cors');
var favicon = require('serve-favicon');
var path = require('path');
var repository = require('./repository/repository')

//Express-App initialisieren
const app = express();             

//Icon einbinden
app.use(favicon(path.join(__dirname, '../assets', 'favicon.ico'))); 

//Landingpage, falls jemand das Backend direkt aufruft
app.get('/', (req, res) => {
    res.sendFile('../index.html', {root: __dirname});
});

//Sende die Daten der Tabelle an sich ans Frontend
app.get('/data', (req, res) => { 
    return res.send(Object.values(repository.getJSONData()));
})

//Sende eine Liste aller Länder an das Frontend
app.get('/countries', (reg, res) => { 
    return res.send(repository.getCountryFilters());

})

//Sende eine Liste aller Unternehmen an das Fronend
app.get('/companies', (reg, res) => { 
    return res.send(repository.getCompanyFilters());

})

//Resette die Daten
app.get('/resetData', (reg, res) => { 
    repository.resetData();
    return res.sendStatus(200);
})

//Resette de Filter
app.get('/resetFilters', (reg, res) => { 
    repository.resetFilters();
    return res.sendStatus(200);
})

//Sende eine Liste der FAQ-Texte an das Frontend 
app.get('/faq', (reg, res) => { 
    return res.send(repository.getFAQData());
})

module.exports = app;