import { React, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrCity, searchCity } from '../store/actions/index'
import List from '../components/List'
import db from 'just-debounce'
import GetUserLocation from '../components/GetUserLocation'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [city, setCity] = useState('')
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef(null)
    const currCity = useSelector((state) => state.city.LocalizedName)
    const dayMode = useSelector((state) => state.dayMode)
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick)
        // setCity(currCity)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [currCity])
    

    const handleOutsideClick = (ev) => {
        const { current: wrap } = wrapperRef
        if (wrap && !wrap.contains(ev.target)) setDisplay(false)
    }

    const onSearchType = async (ev) => {
        ev.preventDefault()
        const letter = ev.nativeEvent.data
        if (letter) {
            const letterCode = letter.charCodeAt(0)
            if (!(letterCode >= 65 && letterCode <= 90) && !(letterCode >= 97 && letterCode <= 122)) return
        }
        setCity(ev.target.value)
        if (!ev.target.value) return
        const debouncedDispatch = db(() => dispatch(searchCity(city)), 850)
        debouncedDispatch()

    }
    const onSelect = (city) => {
        setCity(city.LocalizedName)
        dispatch(setCurrCity(city))
    }

    return (
        <>
        <div
            ref={wrapperRef}>
            <GetUserLocation/>
            <h3> Search a City...</h3>
            <input type="text" 
                placeholder="Type to Search..."
                onChange={onSearchType}
                value={city}
                onClick={() => setDisplay(!display)}
                className={dayMode ? null : 'night'}>
            </input>
            <div
                className="options-list"
                style={display ? { transform: 'scaleY(1)' } : { transform: 'scaleY(0)' }}>
                <List onSelect={onSelect} listType={'searchOptions'} />
            </div>
        </div>
        </>
    )
}
export default SearchBar