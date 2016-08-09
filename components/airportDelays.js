import React from 'react';

class AirportDelays extends React.Component {

	constructor(props) {
	    super(props)
	    this.state = {
	    	delays: [],
	    }
	}

	componentWillMount() {
		$.ajax({
	      type: 'GET',
	      url: "https://api.flightstats.com/flex/delayindex/rest/v1/jsonp/country/US?appId=268f3416&appKey=29f74e2ac16198b6c8bbaac88f8073eb&classification=2&score=2",
	      dataType: 'jsonp',
	      success: function(data) {
	      	var list = []
	      	for (var i=0; i<data.delayIndexes.length; i++) {
		      	var Delay = new Object();
	      		Delay.name = data.delayIndexes[i].airport.name;
	      		Delay.city = data.delayIndexes[i].airport.city;
	      		Delay.numFlights = data.delayIndexes[i].flights;
	      		Delay.cancelled = data.delayIndexes[i].canceled;
	      		Delay.delay15 = data.delayIndexes[i].delayed15;
	      		Delay.delay30 = data.delayIndexes[i].delayed30;
	      		Delay.delay45 = data.delayIndexes[i].delayed45;
	      		list.push(Delay);
	      	}
	      	console.log(list)
      		this.setState({delays: list})
	      }.bind(this)
	    })
	}

	componentDidMount() {
	  $(window).scrollTop(440);
	}

	render () {
		return (
			<div>
			<ul className='airportDelays'>
				{this.state.delays.map(function (i, idx) {
					return <li key={idx}>
					<h1>{i.name}</h1>
					<p>{i.city}</p>
					<h2># of flights: {i.numFlights}</h2>
					<div>
						<b>Delayed 15-30min</b>
						<p>{i.delay15}</p>
					</div>
					<div>
						<b>Delayed 30-45min</b>
						<p>{i.delay30}</p>
					</div>
					<div>
						<b>Delayed 45+min</b>
						<p>{i.delay45}</p>
					</div>
					<div>
						<b>Cancelled!!</b>
						<p>{i.cancelled}</p>
					</div>
					</li>
				})}
			</ul>
			</div>
		)
	}
}

export default AirportDelays