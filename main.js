import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router"

import Login from './components/Login'
import Home from "./App"
import Layout from './Layout'
import Manager from './components/Manager'
import CurrencyConverter from './components/CurrencyConverter'
import WeatherAndTime from './components/Weather'
import WorldClock from './components/Clock'
import DialingCodes from './components/Dialing_Codes'
import AirportInfo from './components/Flight'
import AirlineInfo from './components/CheckIn_Baggage'
import Guide from './components/TravelGuide'
import PassportReqs from './components/Passport'
import AirportDelays from './components/airportDelays'
import Resources from './components/travelResources'
import News from './components/AltourNews.js'

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path='/' component={Layout}>
			<IndexRoute component={Home}></IndexRoute>
			<Route path='/manager' component={Manager}></Route>
			<Route path='/worldClock' component={WorldClock}></Route>
			<Route path='/currency' component={CurrencyConverter}></Route>
			<Route path='/flights' component={AirportInfo}></Route>
			<Route path='/guide' component={Guide}></Route>
			<Route path='/delays' component={AirportDelays}></Route>
			<Route path='/passport' component={PassportReqs}></Route>
			<Route path='/dialingCodes' component={DialingCodes}></Route>
			<Route path='/weatherTime' component={WeatherAndTime}></Route>
			<Route path='/checkin' component={AirlineInfo}></Route>
			<Route path='/resources' component={Resources}></Route>
			<Route path='/news' component={News}></Route>
		</Route>
	</Router>, document.getElementById('app')
);