import React from 'react';
import { Link } from 'react-router';

// Make an ICO

class Layout extends React.Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    	delays: ['No delays found'],
	    }
	}

	onMouseEnterHandler () {
		$('.dropDown').css('display', 'inline-block');
	}

	onMouseLeaveHandler () {
		$('.dropDown').css('display', 'none');
	}

	componentWillMount() {
		// TO CREATE A NEW LINK TYPE IF NEEDED

		// $.ajax({
		//   type: "POST",
		//   url: 'http://10.200.22.119:1337/linkType?name=extra',
		//   success: function(data) {
		//   	console.log('Created linkType!')
		//   }
		// })
		
		var x = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" ),
		      s;
		  x.open(
		    // requesting the headers is faster, and just enough
		    "HEAD",
		    // append a random string to the current hostname to make sure we're not hitting the cache
		    "//" + window.location.hostname + "/?rand=" + Math.random(),
		    // make a synchronous request
		    false
		  );
		  try {
		    x.send();
		    s = x.status;
		    // Make sure the server is reachable
		    console.log( s >= 200 && s < 300 || s === 304 );
		  // catch network & other problems
		  } catch (e) {
		    console.log('Server is down');
		  }
		  
		$.ajax({
	      type: 'GET',
	      url: "https://api.flightstats.com/flex/delayindex/rest/v1/jsonp/country/US?appId=268f3416&appKey=29f74e2ac16198b6c8bbaac88f8073eb&classification=2&score=2",
	      dataType: 'jsonp',
	      jsonpCallback: 'flightstatus',
	      success: function(data) {
	      	if (data.delayIndexes.length > 0) {
		      	var i = 0
		      	var list
		      	var Delay = new Object();
	      		Delay.name = data.delayIndexes[i].airport.name;
	      		Delay.city = data.delayIndexes[i].airport.city;
	      		Delay.numFights = data.delayIndexes[i].flights;
	      		Delay.cancelled = data.delayIndexes[i].canceled;
	      		Delay.delay15 = data.delayIndexes[i].delayed15;
	      		Delay.delay30 = data.delayIndexes[i].delayed30;
	      		Delay.delay45 = data.delayIndexes[i].delayed45;
	      		list = Delay;
	      		i++

	      		this.setState({delays: list.name + ": # of flights: " + list.numFights + ". Cancelled: " + list.cancelled + ". Delayed 15-30 min: " + list.delay15 + ". Delayed 30-45 min: " + list.delay30 + ". Delayed 45+ min: " + list.delay45 + "." })
	      		if (data.delayIndexes.length > 1) {
			      	setInterval(function() {
		      			$('.ticker li').hide()
			      		var Delay = new Object();
			      		Delay.name = data.delayIndexes[i].airport.name;
			      		Delay.city = data.delayIndexes[i].airport.city;
			      		Delay.numFights = data.delayIndexes[i].flights;
			      		Delay.cancelled = data.delayIndexes[i].canceled;
			      		Delay.delay15 = data.delayIndexes[i].delayed15;
			      		Delay.delay30 = data.delayIndexes[i].delayed30;
			      		Delay.delay45 = data.delayIndexes[i].delayed45;
			      		list = Delay;
			      		if (i < data.delayIndexes.length-1) {
			      			i++;
			      		} else {
			      			i = 0;
			      		}
			      		this.setState({delays: list.name + ": # of flights: " + list.numFights + ". Cancelled: " + list.cancelled + ". Delayed 15-30 min: " + list.delay15 + ". Delayed 30-45 min: " + list.delay30 + ". Delayed 45+ min: " + list.delay45 + "." })
				    	$('.ticker li').show()
				    }.bind(this), 10000)
			    }
			}
	      }.bind(this)
	    })

        fetch('custom.json')
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              custom: data.starkey,
              forms: data.starkey.forms
            });
            document.getElementById("companyLogo").src = data.starkey.logo;
          });
	}
	componentDidMount() {

		$('#links ul.navbar li.menu').click(function() {
			if ($('#links ul.navbar').height() === 75) {
				$('#links ul.navbar').css('height', '470px')
			} else {
				$('#links ul.navbar').css('height', '75px')
			}
		})
		$('#links ul.navbar .mobileNavContainer a').click(function() {
			$('#links ul.navbar').css('height', '75px')
		})
	}

	render() {
		return (
			<div>
			<div id='links'>
				<ul className='navbar'>
					<div className='navContainer'>
						<Link to='manager'>
							<li>Manager</li>
						</Link>
						<li class='homeLink'>
							<a href='../#'>My Profile</a>
						</li>
						<li>
							<a href='https://www.concursolutions.com/' target='_blank'>Travel Booking</a>
						</li>
						<Link to='checkin'>
							<li>Online Check-In</li>
						</Link>
						<li onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>Travel Tools</li>
						<Link to='resources'>
							<li>Travel Resources</li>
						</Link>
						<ul className='dropDown' onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
							<div className='dropContainer'>
								<li><a href='http://carbonneutralcalculator.com/flightcalculator.aspx' target='_blank'>CO2 Converter</a></li>
								<Link to='passport'><li>Passport Requirements</li></Link>
								<Link to='currency'><li>Currency Converter</li></Link>
								<Link to='weatherTime'><li>Weather</li></Link>
								<Link to='worldClock'><li>World Clock</li></Link>
								<Link to='dialingCodes'><li>International Dialing Codes</li></Link>
							</div>
						</ul>
					</div>
					<div className='mobileNavContainer'>
						<li className='menu'>
							<span>- Menu -</span>
						</li>
						<Link to='manager'>
							<li>Manager</li>
						</Link>
						<li>
							<a href='http://localhost:1313/#'>My Profile</a>
						</li>
						<li>
							<a href='https://www.concursolutions.com/' target='_blank'>Travel Booking</a>
						</li>
						<Link to='checkin'>
							<li>Online Check-In</li>
						</Link>
						<Link to='resources'>
							<li>Travel Resources</li>
						</Link>
						<li><a href='http://carbonneutralcalculator.com/flightcalculator.aspx' target='_blank'>CO2 Converter</a></li>
						<Link to='passport'><li>Passport Requirements</li></Link>
						<Link to='currency'><li>Currency Converter</li></Link>
						<Link to='weatherTime'><li>Weather</li></Link>
						<Link to='worldClock'><li>World Clock</li></Link>
						<Link to='dialingCodes'><li>International Dialing Codes</li></Link>
					</div>
				</ul>
				<div className='ticker'>
					<ul>
						<li>{this.state.delays}</li>
					</ul>
				</div>
			</div>
			<section className='main'>
				{this.props.children}
			</section>
			</div>
		)
	}
};

export default Layout