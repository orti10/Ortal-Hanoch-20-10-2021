import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, getFavorites } from '../store/actions/index'
import { setCurrCity } from '../store/actions/index'
import { useHistory } from 'react-router-dom'

import ListItem from './ListItem'

const List = props => {
    const history = useHistory()

    const dispatch = useDispatch()
    const cityList = useSelector((state) => state.cityList)
    const [favoritesToDisplay, setFavoritesToDisplay] = useState([])
    const { listType } = props

    useEffect(() => {
        dispatch(getFavorites()).then(res=>{
            setFavoritesToDisplay(res.payload)
        })
    }, [])

    const toggleFavoriteCity = async (city) => {
        await dispatch(toggleFavorite(city))
        const res = await dispatch(getFavorites())
        setFavoritesToDisplay(res.payload)
    }

    const onSelect = (city) => {
        dispatch(setCurrCity(city))
        if(history.location.pathname !== "/")history.push('/')
    }

    const renderContents = renderArr => {
        if (listType === 'searchOptions') if (cityList === [] || !cityList) return
        return renderArr.map(city => {
            const isInFavorites = favoritesToDisplay.find((favoriteCity) => favoriteCity.Key === city.Key)
            return <ListItem
                isInFavorites={isInFavorites}
                city={city}
                listType={listType}
                toggleFavoriteCity={toggleFavoriteCity}
                key={city.Key}
                onSelect={onSelect}
            />
        })
    }
    return (<div className={listType === 'favorites' ? 'ui container' : null}>
        <div className={listType === 'favorites' && favoritesToDisplay.length ? 'ui relaxed grid ' : 'ui divided list'}>
            {listType === 'searchOptions' && renderContents(cityList)}
            {listType === 'favorites' && renderContents(favoritesToDisplay)}
            {listType === 'favorites' && !favoritesToDisplay.length && <div className="favorites-empty-msg"> <p>
                Your favorites list is empty</p></div>}
        </div>
    </div>)
}

export default List