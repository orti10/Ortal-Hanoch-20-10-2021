import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchCityFromLocation } from '../store/actions/index'


const GetUserLocation = () => {
    const dayMode = useSelector((state) => state.dayMode)
    const [msg, setMsg] = useState('Click HERE to check the forecast for your location!')
    const dispatch = useDispatch()
    const success = position => { 
        dispatch(searchCityFromLocation(position.coords.latitude, position.coords.longitude)) }
    const error = err => {
        console.log(err);
        setMsg('ALLOW this app access to your location')
    }
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(success, error)
    }
    return (
        <div>
            <button
                className={dayMode ? 'ui button labeled icon' : 'ui button inverted basic labeled violet icon'}
                onClick={getLocation}
            >
                <i className="location arrow icon"></i>
                    Search By Location
            </button>
            <p>{msg}</p>
        </div>
    )
}

export default GetUserLocation