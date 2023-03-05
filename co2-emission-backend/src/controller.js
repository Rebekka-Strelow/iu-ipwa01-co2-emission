const getJSONData = () => {
    let filePath = "../data/data.json";
    var data = require(filePath).data;
    return Array.from(data);
}

const getCountryFilters = () => {
    var data = getJSONData();
    var resultSet = new Set();
    data.forEach(element => {
        resultSet.add(element.land)
    });
    return Array.from(resultSet);
}

const getCompanyFilters = () => {
    var data = getJSONData();
    var resultSet = new Set();
    data.forEach(element => {
        resultSet.add(element.unternehmen)
    });
    return Array.from(resultSet);
}

module.exports = {
    getJSONData,
    getCountryFilters,
    getCompanyFilters
}
