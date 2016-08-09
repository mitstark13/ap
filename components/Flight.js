import React from 'react'
import ReactDOM from 'react-dom'
import { PropTypes } from 'react'

class FlightInfo extends React.Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    	flightResponse: [],
	    }
	}

	getFlightInfo(e) {	
    	e.preventDefault();
      $('#loadingCircle').css('display', 'block')
      var hourSearch = this.hour.value
      var numHours = '1'
      if (hourSearch === '24') {
        numHours = '24'
        hourSearch = '0'
      }
    	console.log('Getting airport info...')
    	console.log(this.departCity.value, "to", this.arrivalCity.value)

		$.ajax({
          type: 'GET',
          url: "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/route/status/"+this.departCity.value+"/"+this.arrivalCity.value+"/dep/"+this.year.value+"/"+this.month.value+"/"+this.day.value+"?appId=268f3416&appKey=29f74e2ac16198b6c8bbaac88f8073eb&hourOfDay="+hourSearch+"&utc=false&numHours=" + numHours + "&extendedOptions=useInlinedReferences",
          dataType: 'jsonp',
          jsonpCallback: 'flightstatus',
          success: function(data) {
          	let flights = data.flightStatuses;
            let flightArr = []
          	let testNumber = this.flightNumber.value;
          	console.log(flights);
          	for (let i=0; i<flights.length; i++) {
          		let gateDelay = 0
              let departHour = flights[i].departureDate.dateLocal.split("T")[1].slice(0, -7).split(":")[0]
              let departMin = flights[i].departureDate.dateLocal.split("T")[1].slice(2, -7)
              let arriveHour = flights[i].arrivalDate.dateLocal.split("T")[1].slice(0, -7).split(":")[0]
              let arriveMin = flights[i].arrivalDate.dateLocal.split("T")[1].slice(2, -7)
              let departMidday = 'AM'
              let arriveMidday = 'PM'
          		let status = "Flight is on schedule"

          		if (flights[i].delays) {
                if (flights[i].delays.departureGateDelayMinutes > 0) {
            			if (flights[i].delays.departureGateDelayMinutes) {
            				// delayTime += flights[i].delays.departureGateDelayMinutes
            				gateDelay = flights[i].delays.departureGateDelayMinutes
            			}
            			// if (flights[i].delays.arrivalGateDelayMinutes) {
            			// 	delayTime += flights[i].delays.arrivalGateDelayMinutes
            			// }
            			// if (flights[i].delays.arrivalRunwayDelayMinutes) {
            			// 	delayTime += flights[i].delays.arrivalRunwayDelayMinutes
            			// }
            			// if (flights[i].delays.departureRunwayDelayMinutes) {
            			// 	delayTime += flights[i].delays.departureRunwayDelayMinutes
            			// }
                  status = ("Delayed (" + gateDelay + " mins)")
                  departMin = +departMin.split(':')[1] + gateDelay
                  arriveMin = +arriveMin.split(':')[1] + gateDelay
                  if (departMin >= 60) {
                    departHour++
                    departMin = departMin - 60
                  }
                  if (arriveMin >= 60) {
                    arriveHour++
                    arriveMin = arriveMin - 60
                  }
                  if (departMin < 10) {
                      departMin = "0" + departMin
                  }
                  if (arriveMin < 10) {
                      arriveMin = "0" + arriveMin
                  }
                  departMin = (':' + departMin)
                  arriveMin = (':' + arriveMin)
                }
          		}
              if (departMin >= 60) {
                departHour++
                departMin = departMin - 60
              }
              if (arriveMin >= 60) {
                arriveHour++
                arriveMin = arriveMin - 60
              }
              if (departHour > 11) {
                departMidday = 'PM'
              }

              if (arriveHour < 12) {
                arriveMidday = 'AM'
              }
              if (departHour > 12) {
                departHour = (departHour - 12)
              }
              if (arriveHour > 12) {
                arriveHour = (arriveHour - 12)
              }
              if (departMin < 10) {
                  departMin = "0" + departMin
              }
              if (arriveMin < 10) {
                  arriveMin = "0" + arriveMin
              }
          		if (flights[i].status === "C") {
          			status = ("This flight is cancelled!!")
          		}
              if (departHour === '00') {
                departHour = 12
              }
              if (arriveHour === '00') {
                arriveHour = 12
              }

          		var flight = new Object();
              flight.name = (flights[i].carrier.name + " Flight " + flights[i].flightNumber);
              flight.status = status;
              flight.departingCode = this.departCity.value.toUpperCase();
              flight.arrivingCode = this.arrivalCity.value.toUpperCase();
              flight.departingCity = ('Departs ' + flights[i].departureAirport.city);
              flight.arrivingCity = ('Arrives in ' + flights[i].arrivalAirport.city);
              flight.departingDate = (this.month.value + '/' + this.day.value + '/' + this.year.value);
              if (flights[i].arrivalDate.dateLocal[9] !== this.day.value.slice(-1)) {
                console.log(flights[i].arrivalDate.dateLocal[9] + "-----" + this.day.value)
                flight.arrivingDate = (this.month.value + '/' + (Number(this.day.value) + 1) + '/' + this.year.value);
              } else {
                flight.arrivingDate = (this.month.value + '/' + this.day.value + '/' + this.year.value);
              }
              flight.departingTime = (departHour + '' + departMin + departMidday);
              flight.arrivingTime = (arriveHour + '' + arriveMin + arriveMidday);

              if (flights[i].airportResources) {
                if (flights[i].airportResources.departureGate) {
                  flight.departingGate = flights[i].airportResources.departureGate
                } else {
                  flight.departingGate = '---'
                }
                if (flights[i].airportResources.arrivalGate) {
                  flight.arrivingGate = flights[i].airportResources.arrivalGate
                } else {
                  flight.arrivingGate = '---'
                }
                if (flights[i].airportResources.departureTerminal) {
                  flight.dTerminal = flights[i].airportResources.departureTerminal
                } else {
                  flight.dTerminal = '---'
                }
                if (flights[i].airportResources.arrivalTerminal) {
                  flight.aTerminal = flights[i].airportResources.arrivalTerminal
                } else {
                  flight.aTerminal = '---'
                }
              }

              if (testNumber) {
	          		if (flights[i].flightNumber === testNumber) {
                  flightArr.push(flight)
	          		}
	          	} else {
                flightArr.push(flight)
	          	}
          	}
            this.setState({flightResponse: flightArr})
            $('#loadingCircle').css('display', 'none')
          }.bind(this),
          error: function() { console.log('Error getting flight!') }
        });
    $('html, body').animate({
        scrollTop: $("#loadingCircle").offset().top
    }, 1000);
	}

  onChange(e) {
    e.target.style.border = "1px solid #ccffcc"
  }

  componentDidMount() {
    $(window).scrollTop(440);
  }

	render() {
		return (
      <div>
			<div className='flightSearch'>
				<h1> Search Direct Flights </h1>
        <p className='codeHelp'>(Check <a href='http://www.airportcodes.org/' target='_blank'>www.airportcodes.org</a> for airport codes)</p>
        <div className='form'>
  				<p>Departing<br/><input type='text' placeholder="IND" maxlength="3" onChange={this.onChange} ref={(input) => this.departCity = input} /></p>
          <p>Arriving<br/><input type='text' placeholder="ORD" maxlength="3" onChange={this.onChange} ref={(input) => this.arrivalCity = input} /></p>
  				<p className='date'>Date<br/><input type='text' placeholder="05 (Month)" onChange={this.onChange} ref={(input) => this.month = input} /><input type='text' placeholder="13 (Day)" onChange={this.onChange} ref={(input) => this.day = input} /><input type='text' placeholder="2016 (Year)" onChange={this.onChange} ref={(input) => this.year = input} /></p>
  				<p>Time<br/>
            <select ref={(input) => this.hour = input}>
              <option value="24">ALL DAY</option>
              <option value="0">12:00AM-12:59AM</option>
              <option value="1">1:00AM-1:59AM</option>
              <option value="2">2:00AM-2:59AM</option>
              <option value="3">3:00AM-3:59AM</option>
              <option value="4">4:00AM-4:59AM</option>
              <option value="5">5:00AM-5:59AM</option>
              <option value="6">6:00AM-6:59AM</option>
              <option value="7">7:00AM-7:59AM</option>
              <option value="8">8:00AM-8:59AM</option>
              <option value="9">9:00AM-9:59AM</option>
              <option value="10">10:00AM-10:59AM</option>
              <option value="11">11:00AM-11:59AM</option>
              <option value="12">12:00PM-12:59PM</option>
              <option value="13">1:00PM-1:59PM</option>
              <option value="14">2:00PM-2:59PM</option>
              <option value="15">3:00PM-3:59PM</option>
              <option value="16">4:00PM-4:59PM</option>
              <option value="17">5:00PM-5:59PM</option>
              <option value="18">6:00PM-6:59PM</option>
              <option value="19">7:00PM-7:59PM</option>
              <option value="20">8:00PM-8:59PM</option>
              <option value="21">9:00PM-9:59PM</option>
              <option value="22">10:00PM-10:59PM</option>
              <option value="23">11:00PM-11:59PM</option>
            </select>
          </p>
  				<p>Flight Number <small> *Optional</small><br/><input type='text' placeholder="1356" ref={(input) => this.flightNumber = input} /> </p>
				</div>
        <button onClick={this.getFlightInfo.bind(this)}> Find Flight </button>
      </div>
      <img src="../img/loading_circle.gif" alt="LOADING" id="loadingCircle"/>
      <div id='flightResults' className='flightResultsDiv'>
        <ul className='flightResults'>
          {this.state.flightResponse.map(function(i, idx) {
            var delayStyle = 'black'
            var img = 'img/LflightOnTime.png'
            console.log(i.status)
            if (i.status != "Flight is on schedule") {
              delayStyle = 'red'
              img = 'img/LflightDelayed.png'
            }

            return (
              <li key={idx}>
                <h1>{i.name}</h1>
                <p className='status' style={{color : delayStyle}}>{i.status}</p>
                <b className='codes'>{i.departingCode}</b>
                <b className='codes'>{i.arrivingCode}</b>
                <img src={img} />
                <div className='lined'></div>
                <div>
                  <h2>{i.departingCity} <br /> {i.departingDate}</h2>
                  <div className='line'></div>
                  <table>
                    <thead>
                    <tr>
                      <th>Time</th>
                      <th>Terminal</th> 
                      <th>Gate</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{color : delayStyle}}>{i.departingTime}</td>
                        <td>{i.dTerminal}</td> 
                        <td>{i.departingGate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h2>{i.arrivingCity} <br /> {i.arrivingDate}</h2>
                  <div className='line'></div>
                  <table>
                    <thead>
                    <tr>
                      <th>Time</th>
                      <th>Terminal</th> 
                      <th>Gate</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td style={{color : delayStyle}}>{i.arrivingTime}</td>
                      <td>{i.aTerminal}</td> 
                      <td>{i.arrivingGate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              )
          }) }
        </ul>
      </div>
			</div>
		)
	}
};

export default FlightInfo