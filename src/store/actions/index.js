import { weatherAPI } from '../../api/weather';
import { storageService } from '../../services/storage.service'

export const toggleUnit = dispatch =>{
    dispatch({ type: 'TOGGLE_UNIT' })
}
export const toggleMode = dispatch =>{
    dispatch({ type: 'TOGGLE_MODE' })
}
export const searchCityFromLocation = (lat, lng) => async dispatch =>{
    try {
        const city = await weatherAPI.getCityFromGeolocation(lat, lng)
        const res = await weatherAPI.getWeather(city);
        dispatch({ type: 'GET_WEATHER', payload: res }); 
        dispatch({ type: 'SET_CITY', payload: city });

    }
    catch (err) {console.log(err);}
}
export const searchCity = term => async dispatch =>{
    try {
        const res = await weatherAPI.query(term);
        dispatch({ type: 'SEARCH_CITY', payload: res });
    }
    catch (err) { console.log(`ERROR! Can NOT get the AccuWeather API!`)}

}
export const setCurrCity = city => async dispatch =>{
    dispatch({ type: 'SET_CITY', payload: city });
}

export const getWeather = code => async dispatch =>{
    try {
        const res = await weatherAPI.getWeather(code);
        dispatch({ type: 'GET_WEATHER', payload: res });
    }
    catch (err) { console.log(`ERROR! Can NOT get the AccuWeather API!`)}
}
export const getFavorites = () => async dispatch =>{
    const res = await storageService.query('favoriteCities')
    return Promise.resolve(dispatch({ type: 'GET_FAVORITES', payload: res }))
}
export const toggleFavorite = city => async dispatch =>{
    let res;
    const favorites = await storageService.query('favoriteCities')
    const cityInFavorites = favorites.find(favoriteCity => favoriteCity.LocalizedName === city.LocalizedName)
    if (!cityInFavorites) res = await storageService.post('favoriteCities', city)
    else res = await storageService.remove('favoriteCities', cityInFavorites.id)
    dispatch({ type: 'SET_FAVORITES', payload: res })
}