import { React } from 'react'
import { useHistory } from 'react-router-dom'
import List from '../components/List'
import { useDispatch } from 'react-redux';
import { setCurrCity } from '../store/actions/index'


const Favorites = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const onSelectCity = (city) => {
        dispatch(setCurrCity(city))
        history.push('/')
    }
    return (
        <div className="favorites-page">
            <div className="ui horizontal divider">
                Your Favorite Cities
</div>
            <List onSelect={onSelectCity} listType={'favorites'} />
        </div>
    );
}
export default Favorites;