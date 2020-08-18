const axios = require('axios').default;

const getForecast = (searchInput, searchType) => {
    
    let queryString = '';

    switch(searchType){
        case 'coordinates':
            const [lat, lon] = searchInput.split(':');
            queryString = `lat=${lat}&lon=${lon}`;
            break;
        case 'zip':
            queryString = `zip=${searchInput}`;
            break;
        case 'city':
            queryString = `q=${searchInput}`;
            break;
    }
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?${queryString}&APPID=${apiKey}&units=imperial&cnt=32`;
    
    return axios.get(url);
}

module.exports = { getForecast };