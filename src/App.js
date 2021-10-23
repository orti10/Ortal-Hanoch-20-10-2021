import {React, useEffect} from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { toggleMode } from './store/actions/index'

import './style.css'
import './media-query.css'
import Weather from './views/Weather'
import Favorites from './views/Favorites'
import Header from './components/Header'

const App = () => {
  const date = new Date()
  const hours = date.getHours()
  const dispatch = useDispatch()
  useEffect(() => {
      if (hours < 18 && hours < 5)dispatch(toggleMode)
  })

  const dayMode = useSelector((state) => state.dayMode)
  return (
    <div className={dayMode ? 'background-day' : 'background-night'}>
      <div className={dayMode ? 'ui  container main-app ' : 'ui  container main-app night'}>
        <HashRouter >
          <Header />
          <div className="App ui container  app-main ">
            <Route path="/favorites" exact component={Favorites} />
            <Route path="/" exact component={Weather} />
          </div>
        </HashRouter >
      </div>
    </div>
  );
}
export default App;