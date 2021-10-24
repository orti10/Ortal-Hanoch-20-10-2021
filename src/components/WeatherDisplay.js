
import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWeather } from '../store/actions/index'

const WeatherDisplay = () => {
    const dispatch = useDispatch();
    const currCity = useSelector((state) => state.city);
    const dayMode = useSelector((state) => state.dayMode)
    const unit = useSelector((state) => state.unit);
    const weather = useSelector((state) => state.weather);
    const [msg, setMsg] = useState('Loading...')
    const [msgHeader, setMsgHeader] = useState('Loading')
    let icon;

    useEffect(() => {
        dispatch(getWeather(currCity))
    }, [dispatch, currCity]);

    (function () {
        if (weather.DailyForecasts) { dayMode ? icon = weather.DailyForecasts[0].Day.Icon : icon = weather.DailyForecasts[0].Night.Icon }
        else setTimeout(() => {
            setMsg(`We're having some technical difficulties! Please try again later.`)
            setMsgHeader('Error')
        }, 2000);
    })()
    const renderImg = () => {
        if (!icon) return
        else if (icon < 10) return <img src={`https://developer.accuweather.com/sites/default/files/0${icon}-s.png`} alt="weather icon" />
        else return <img src={`https://developer.accuweather.com/sites/default/files/${icon}-s.png`} alt="weather icon" />
    }
    const renderDegrees = (dayNum) => {
        if (!icon) return
        const degrees = dayMode ? weather.DailyForecasts[dayNum].Temperature.Maximum.Value : weather.DailyForecasts[dayNum].Temperature.Minimum.Value
        return unit ? Math.floor(degrees) : Math.floor(degrees * 9 / 5 + 32)
    }
    const renderFiveDays = () => {
        if (!icon) return
        return weather.DailyForecasts.map((day, idx) => {
            dayMode ? icon = weather.DailyForecasts[idx].Day.Icon : icon = weather.DailyForecasts[idx].Night.Icon
            const message = dayMode ? weather.DailyForecasts[idx].Day.ShortPhrase : weather.DailyForecasts[idx].Night.ShortPhrase
            return <div className={dayMode? 'ui card' : 'ui card night'}
                key={idx}>
                <div className="content">
                    <h3 className="header">
                        {currCity.LocalizedName} <span>{day.Date.substring(5, 10)}</span>
                    </h3>
                    <p className="ui description">
                        {renderImg()}
                        {renderDegrees(idx)} °
                </p>
                    <p>{message}</p>
                    <a href={weather.Headline.Link}>See More</a>
                </div>
            </div>
        })
    }

    return (<>
        <div>
            {!weather.DailyForecasts &&
                <div className="ui card">
                    <div className="content">
                        <h4 >{msgHeader}</h4>
                        <p>{msg}</p>
                    </div>
                </div>
            }
        </div>
        {weather.DailyForecasts &&
            <div>
                {renderFiveDays()}</div>}

    </>)
}

export default WeatherDisplay