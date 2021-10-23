import axios from 'axios'
const KEY = '?apikey=dWRWgogZNXfdk0HgKAeRAkpJ0nnMq5Yf'
const SEARCH_URL = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete`
const WEATHER_URL = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`
const GEOLOCATION_URL = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search`

export const weatherAPI = {
    query,
    getWeather,
    getCityFromGeolocation,
    getWeatherFromKey
}

async function query(term) {
    return axios.get(SEARCH_URL + KEY + '&q=' + term + '&language=en-us').then(res=>{
        return res.data
    })
}

async function getWeather(city) {
    return axios.get(WEATHER_URL + city.Key + KEY + '&language=en-us&details=true&metric=true').then(res=>  {
        return res.data
    })
}

async function getWeatherFromKey(key) {
    return axios.get(WEATHER_URL + key + KEY + '&language=en-us&details=true&metric=true').then(res=>  {
        return res.data
    })
}

async function getCityFromGeolocation(lat,lng){
    return axios.get(GEOLOCATION_URL+  KEY + '&q='+lat+','+lng).then(res=>  {
        return res.data
    })
}