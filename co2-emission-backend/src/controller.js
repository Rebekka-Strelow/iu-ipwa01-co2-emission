//Cache
let cashedData = [];
let cachedCountryFilters = [];
let cashedCompanyFilters = [];


//Methoden, die für die API bereit gestellt werden
const getJSONData = () => {
    if(cashedData.length == 0){
        let filePath = "../data/data.json";
        delete require.cache[require.resolve(filePath)];
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
            resultSet.add(element.land);
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
}

const resetData = () => {
    cashedData = [];
}

//Bereitstellen der Methdoen für die API
module.exports = {
    getJSONData,
    getCountryFilters,
    getCompanyFilters,
    resetData,
    resetFilters
}
