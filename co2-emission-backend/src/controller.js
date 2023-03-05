const readJSON = () => {
    let filePath = "../data/data.json";
    var data = require(filePath).data;
    return data;
}

const getCountryFilters = () => {
    var data = readJSON();
    var resultSet = new Set();
    data.forEach(element => {
        resultSet.add(element.land)
    });
    return resultSet;
}

const getCompanyFilters = () => {
    var data = readJSON();
    var resultSet = new Set();
    data.forEach(element => {
        resultSet.add(element.unternehmen)
    });
    return resultSet;
}

module.exports = {
    readJSON,
    getCountryFilters,
    getCompanyFilters
}

/*module.exports = {
    readJSON: function() {
        let filePath = "../data/data.json";
        var data = require(filePath).data;
        return data;
    },

    getCountryFilters: function(){
        var data = readJSON();
        var resultSet = new Set();
        data.forEach(element => {
            resultSet.add(element.land)
        });
        return resultSet;
    }
 }*/
