//Cache
let cashedData = [];
let cachedCountryFilters = [];
let cashedCompanyFilters = [];


//Methoden
const getJSONData = () => {
    if(cashedData.length == 0){
        let filePath = "../data/data.json";
        var data = require(filePath).data;
        cashedData = Array.from(data);
    }
    return cashedData;
}

const getCountryFilters = () => {
    if(cachedCountryFilters.length == 0){
        var data = getJSONData();
        var resultSet = new Set();
        data.forEach(element => {
            resultSet.add(element.land)
        });
        cachedCountryFilters = Array.from(resultSet);
    }
    return cachedCountryFilters;
}

const getCompanyFilters = () => {
    if(cashedCompanyFilters.length == 0){
        var data = getJSONData();
        var resultSet = new Set();
        data.forEach(element => {
            resultSet.add(element.unternehmen)
        });
        cashedCompanyFilters = Array.from(resultSet);
    }
   return cashedCompanyFilters;
}

const resetFilters = () => {
    cachedCountryFilters = [];
    cashedCompanyFilters = [];
    getCountryFilters();
    getCompanyFilters();
}

const resetData = () => {
    cashedData = [];
    getJSONData();
    resetFilters();
}

module.exports = {
    getJSONData,
    getCountryFilters,
    getCompanyFilters,
    resetData,
    resetFilters
}
