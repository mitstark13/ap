import React from 'react';

class WeatherAndTime extends React.Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    	forecast: [],
	    	city: '',
	    	state: ''
	    }
	}

	getWeather(e) {
      $('#loadingCircle').css('display', 'block')
    	console.log('Getting weather forecast...')
    	e.preventDefault();
      var moment = require('moment');

    	$.ajax({
    		url: 'https://api.apixu.com/v1/forecast.json?key=9115bc82657143a5b27160128162006&days=7&q=' + this.city.value + ',' + this._state.value,
    		dataType: 'json',
    		success: function(data) {
    			var info = []
    			console.log(data);
    			for (var i=0; i<7; i++) {
    				var today = data.forecast.forecastday[i]
    				var Day = new Object();
            var date = moment(today.date);
    				Day.date = date.format('LL');
            Day.city = data.location.name + ", "
            Day.region = data.location.region
    				Day.Htemp = today.day.maxtemp_f
    				Day.Ltemp = today.day.mintemp_f
    				Day.sunrise = today.astro.sunrise
    				Day.sunset = today.astro.sunset
    				Day.pic = "http://" + today.day.condition.icon.replace('//', '')
    				Day.summary = today.day.condition.text
    				info.push(Day)
    			}
    			console.log(info)
    			this.setState({forecast: info})
    			console.log(this.state.forecast)
          $('#loadingCircle').css('display', 'none')
    		}.bind(this)
    	})
	}

	render() {
		return (
			<div className='weather'>
				<h1>Weather forecast</h1>
				<div className='divContainer'>
				<div>City: <input type='text' placeholder="Indianapolis" ref={(input) => this.city = input} />*</div>
				<div>State/Country: <input type='text' placeholder="IN" ref={(input) => this._state = input} /></div>
				</div>
				<button onClick={this.getWeather.bind(this)}> Click for 7-day forecast </button>
        <img src="../img/loading_circle.gif" alt="LOADING" id="loadingCircle"/>
				<ul className='weatherResults'>
          			{this.state.forecast.map(function(i, idx) {
          				return (
          					<li key={idx}>
                      <div className='title'>
            						<b>{i.date}</b>
                        <small>{i.city + ' '}</small>
                        <small>{i.region}</small>
                      </div>
                      <div className='temps'>
            						<p>High: {i.Htemp}&deg;F</p>
            						<p>Low: {i.Ltemp}&deg;F</p>
                      </div>
                      <div className='summary'>
                        <img src={i.pic} alt="PIC"/>
          						  <p>{i.summary}</p>
          					  </div>
                    </li>
          				)
          			})}
          		</ul>
			</div>
		)
	}
}

export default WeatherAndTime