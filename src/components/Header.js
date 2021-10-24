import { React } from 'react'
import { Link } from 'react-router-dom'
import { toggleUnit, toggleMode } from '../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch()
    const unit = useSelector((state) => state.unit)
    const dayMode = useSelector((state) => state.dayMode)

    const renderUnit = () => {
        return unit ? 'C' : 'F'
    }
    const renderDayMode = () => {
        return dayMode ? <><i className="sun icon"></i>Day Mode</> : <><i className="moon icon"></i>Night Mode</>
    }
    return (
        <div className={dayMode ? 'ui secondary pointing menu' : 'ui secondary pointing menu night'}>
            <Link to="/" className="item">
                <h3>Weather</h3>
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    <h3>Home</h3>
                </Link>
                <Link to="/favorites" className="item">
                    <h3>Favorites</h3>
                </Link>
                <button
                    className={dayMode ? 'ui button' : 'ui button inverted basic violet'}
                    onClick={() => dispatch(toggleUnit)}>
                    {renderUnit()}°
                        </button>
                <button
                    className={dayMode ? 'ui labeled icon button' : 'ui button  labeled icon  inverted basic violet'}
                    onClick={() => dispatch(toggleMode)}>
                    {renderDayMode()}

                </button>
            </div>
        </div>
    );
}
export default Header;