import React from 'react'
import SearchBar from '../components/SearchBar'
import WeatherDisplay from '../components/WeatherDisplay'

const Weather = () => {
    return (
        <div className="ui container ">
            <SearchBar />
            <WeatherDisplay/>
        </div>
    );
}
export default Weather;