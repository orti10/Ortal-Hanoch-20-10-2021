import { React } from 'react'
import { Link } from 'react-router-dom'
import { toggleUnit, toggleMode } from '../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';


const Header = () => {
    const dispatch = useDispatch()
    const unit = useSelector((state) => state.unit)
    const lightMode = useSelector((state) => state.lightMode)

    const renderUnit = () => {
        return unit ? 'C' : 'F'
    }
    const renderlightMode = () => {
        return lightMode ? <><i className="sun icon"></i>Light Mode</> : 
        <><i className="moon icon"></i>Dark Mode</>
    }
    return (
        <div className={lightMode ? 'ui secondary pointing menu' : 
        'ui secondary pointing menu dark'}>
            <h1>Herolo Weather Task</h1>
            <div className="right menu">
                <Link to="/" className="item">
                    <h3>Home</h3>
                </Link>
                <div className="right menu">
                    <Link to="/favorites" className="item">
                        <h3>Favorites</h3>
                    </Link>
                    <button
                        className={lightMode ? 'ui button' : 
                        'ui orange basic button'}
                        onClick={() => dispatch(toggleUnit)}>
                        {renderUnit()}°
                    </button>
                    <button
                        className={lightMode ? 'ui labeled icon button' : 
                        'ui orange basic button'}
                        onClick={() => dispatch(toggleMode)}>
                        {renderlightMode()}

                    </button>
                </div>
            </div>
        </div>
    );
}
export default Header;