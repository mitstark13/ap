import React from 'react';

class Time extends React.Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    	currentTime: '',
	    	city: '',
	    	state: '',
	    	lat: '',
	    	date: ''
	    }
	}

	getCustomTime(e) {
		e.preventDefault();
    	e.stopPropagation();
		var time
		let city = this._city.value
		let state = this._state.value

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		}
		if(mm<10) {
		    mm='0'+mm
		}
		today = mm+'/'+dd+'/'+yyyy;

		this.setState({currentTime: 'Getting time...'})
		if ((city != '') && (state != '')) {
			console.log('Searching: ' + city + ',' + state)
			$.ajax({
			    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+','+state+'&cnt=7&appid=316a2b2cad6f5950838210609c099692',
			    dataType: 'json',
			    success: function(data) {
			    	this.setState({
			    		city: data.city.name + ', ',
			    		state: data.city.country
			    	})
			    	var lat = data.city.coord.lat
			    	this.setState({lat: lat})
			    	var lon = data.city.coord.lon
					var timeStamp = Math.floor(Date.now() / 1000);
					var timeZone
					// $('.clock form').css('display', 'none')
					let limit = 0
					let timer = window.setInterval(function() {
						if (limit === 5) clearInterval(timer);
						var date = new Date();
						if (lat = this.state.lat) {
							$.ajax({
								url: 'https://maps.googleapis.com/maps/api/timezone/json?location=' +lat+ ',' +lon+ '&timestamp=' +timeStamp+ '&key=AIzaSyDuY2jCrYn6UMUxyAaQZkoX-oF-RAPprm4',
								dataType: 'json',
								success: function(data) {
									timeZone = data.timeZoneId
									time = date.toLocaleString('de-DE', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit', timeZone: timeZone })
									time = time.split(', ')[1]
									time = time.split(' ')
									if (time[1] = 'nachm') {
										time[1] = 'PM'
									} else {
										time[1] = 'AM'
									}
									time = time.join(' ')
									console.log(data)
									
								}.bind(this)
							})
							this.setState({currentTime: time})
							this.setState({date: today})
							limit++
						}
					}.bind(this), 1000)
			    }.bind(this),
			    error: function() {
			    	console.log('Clock api error')
			    }
			})
		}
		else {
			alert('Error! Please fill in both a city and a state/country');
		}
	}

	render() {
		return (
			<div className='clock'>
				<h1>World Clock</h1>
    			<form onSubmit={this.getCustomTime.bind(this)}>
	    			<div>Enter city: <input type='text' placeholder='Paris' ref={(input) => this._city = input}/></div>
	    			<div>Enter state/country: <input type='text' placeholder='France' ref={(input) => this._state = input}/></div>
	    			<button type="submit">
						Get time
				    </button>
	    		</form>
	    		<h1>{this.state.city} {this.state.state}</h1>
	    		<div className='clockResponse'>
	    			<p>{this.state.currentTime}</p>
	    			<span>{this.state.date}</span>
	    		</div>
    		</div>
		)
	}
}

export default Time;