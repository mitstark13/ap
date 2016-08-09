import React from 'react';
import { PropTypes } from 'react'

class GetMoney extends React.Component{
	constructor(props) {
	    super(props)
	    this.state = {
	    	firstNum: 1,
	    	first: 'USD',
	    	second: 'EUR',
	    	response: ' '
	    }
	}
	getConversion(e) {
		this.setState({firstNum: this._fromNum.value})
		let newResponse = ''
		$.ajax({
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22'+this._from.value+ '' +this._to.value+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
			dataType: 'json',
			success: function(data) {
				newResponse = (parseFloat(data.query.results.rate.Rate)  * this.state.firstNum).toFixed(2)
				this.setState({first: this._from.value})
				this.setState({second: this._to.value})
				this.setState({response: newResponse})
				console.log(newResponse)
			}.bind(this)
		})
	}

	render() {
		const response = 'Answer will appear here';

		return (<div>
			<h1>Currency Converter</h1>
			<div className='currency'>
			<h2>From</h2>
			<select ref={(input) => this._from = input}>
				<option value="USD">USD</option>
	            <option value="EUR">EUR</option>
	            <option value="GBP">GBP</option>
	            <option value="CAD">CAD</option>
	            <option value="AUD">AUD</option>
	            <option value="JPY">JPY</option>
	            <option value="MXN">MXN</option>
	            <option value="CHF">CHF</option>
	            <option value="SEK">SEK</option>
	            <option value="" disabled="disabled"></option>
	            <option value="AED">AED</option>
	            <option value="ALL">ALL</option>
	            <option value="ANG">ANG</option>
	            <option value="ARS">ARS</option>
	            <option value="AWG">AWG</option>
	            <option value="BBD">BBD</option>
	            <option value="BDT">BDT</option>
	            <option value="BGN">BGN</option>
	            <option value="BHD">BHD</option>
	            <option value="BIF">BIF</option>
	            <option value="BMD">BMD</option>
	            <option value="BND">BND</option>
	            <option value="BOB">BOB</option>
	            <option value="BRL">BRL</option>
	            <option value="BSD">BSD</option>
	            <option value="BTN">BTN</option>
	            <option value="BWP">BWP</option>
	            <option value="BYR">BYR</option>
	            <option value="BZD">BZD</option>
	            <option value="CLP">CLP</option>
	            <option value="CNY">CNY</option>
	            <option value="COP">COP</option>
	            <option value="CRC">CRC</option>
	            <option value="CUP">CUP</option>
	            <option value="CVE">CVE</option>
	            <option value="CZK">CZK</option>
	            <option value="DJF">DJF</option>
	            <option value="DKK">DKK</option>
	            <option value="DOP">DOP</option>
	            <option value="DZD">DZD</option>
	            <option value="ECS">ECS</option>
	            <option value="EEK">EEK</option>
	            <option value="EGP">EGP</option>
	            <option value="ERN">ERN</option>
	            <option value="ETB">ETB</option>
	            <option value="FJD">FJD</option>
	            <option value="FKP">FKP</option>
	            <option value="GHC">GHC</option>
	            <option value="GIP">GIP</option>
	            <option value="GMD">GMD</option>
	            <option value="GNF">GNF</option>
	            <option value="GTQ">GTQ</option>
	            <option value="GYD">GYD</option>
	            <option value="HKD">HKD</option>
	            <option value="HNL">HNL</option>
	            <option value="HRK">HRK</option>
	            <option value="HTG">HTG</option>
	            <option value="HUF">HUF</option>
	            <option value="IDR">IDR</option>
	            <option value="ILS">ILS</option>
	            <option value="INR">INR</option>
	            <option value="IQD">IQD</option>
	            <option value="IRR">IRR</option>
	            <option value="ISK">ISK</option>
	            <option value="JMD">JMD</option>
	            <option value="JOD">JOD</option>
	            <option value="KES">KES</option>
	            <option value="KHR">KHR</option>
	            <option value="KMF">KMF</option>
	            <option value="KPW">KPW</option>
	            <option value="KRW">KRW</option>
	            <option value="KWD">KWD</option>
	            <option value="KYD">KYD</option>
	            <option value="KZT">KZT</option>
	            <option value="LAK">LAK</option>
	            <option value="LBP">LBP</option>
	            <option value="LKR">LKR</option>
	            <option value="LRD">LRD</option>
	            <option value="LSL">LSL</option>
	            <option value="LTL">LTL</option>
	            <option value="LVL">LVL</option>
	            <option value="LYD">LYD</option>
	            <option value="MAD">MAD</option>
	            <option value="MDL">MDL</option>
	            <option value="MKD">MKD</option>
	            <option value="MMK">MMK</option>
	            <option value="MNT">MNT</option>
	            <option value="MOP">MOP</option>
	            <option value="MRO">MRO</option>
	            <option value="MTL">MTL</option>
	            <option value="MUR">MUR</option>
	            <option value="MVR">MVR</option>
	            <option value="MWK">MWK</option>
	            <option value="MYR">MYR</option>
	            <option value="NAD">NAD</option>
	            <option value="NGN">NGN</option>
	            <option value="NIO">NIO</option>
	            <option value="NOK">NOK</option>
	            <option value="NPR">NPR</option>
	            <option value="NZD">NZD</option>
	            <option value="OMR">OMR</option>
	            <option value="PAB">PAB</option>
	            <option value="PEN">PEN</option>
	            <option value="PGK">PGK</option>
	            <option value="PHP">PHP</option>
	            <option value="PKR">PKR</option>
	            <option value="PLN">PLN</option>
	            <option value="PYG">PYG</option>
	            <option value="QAR">QAR</option>
	            <option value="RON">RON</option>
	            <option value="RUB">RUB</option>
	            <option value="RWF">RWF</option>
	            <option value="SAR">SAR</option>
	            <option value="SBD">SBD</option>
	            <option value="SCR">SCR</option>
	            <option value="SDG">SDG</option>
	            <option value="SGD">SGD</option>
	            <option value="SHP">SHP</option>
	            <option value="SIT">SIT</option>
	            <option value="SKK">SKK</option>
	            <option value="SLL">SLL</option>
	            <option value="SOS">SOS</option>
	            <option value="STD">STD</option>
	            <option value="SVC">SVC</option>
	            <option value="SYP">SYP</option>
	            <option value="SZL">SZL</option>
	            <option value="THB">THB</option>
	            <option value="TND">TND</option>
	            <option value="TOP">TOP</option>
	            <option value="TRY">TRY</option>
	            <option value="TTD">TTD</option>
	            <option value="TWD">TWD</option>
	            <option value="TZS">TZS</option>
	            <option value="UAH">UAH</option>
	            <option value="UGX">UGX</option>
	            <option value="UYU">UYU</option>
	            <option value="VEF">VEF</option>
	            <option value="VND">VND</option>
	            <option value="VUV">VUV</option>
	            <option value="WST">WST</option>
	            <option value="XAF">XAF</option>
	            <option value="XAG">XAG</option>
	            <option value="XAL">XAL</option>
	            <option value="XAU">XAU</option>
	            <option value="XCD">XCD</option>
	            <option value="XCP">XCP</option>
	            <option value="XOF">XOF</option>
	            <option value="XPD">XPD</option>
	            <option value="XPF">XPF</option>
	            <option value="XPT">XPT</option>
	            <option value="YER">YER</option>
	            <option value="ZAR">ZAR</option>
	            <option value="ZMK">ZMK</option>
	            <option value="ZWD">ZWD</option>
			</select>
			<input type='text' placeholder='1' ref={(input) => this._fromNum = input} />
			<button onClick={this.getConversion.bind(this)}> <img src='img/convert2.png' /> </button>
			<h2>To</h2>
			<select ref={(input) => this._to = input}>
				<option value="EUR">EUR</option>
	            <option value="USD">USD</option>
	            <option value="GBP">GBP</option>
	            <option value="CAD">CAD</option>
	            <option value="AUD">AUD</option>
	            <option value="JPY">JPY</option>
	            <option value="MXN">MXN</option>
	            <option value="CHF">CHF</option>
	            <option value="SEK">SEK</option>
	            <option value="" disabled="disabled"></option>
	            <option value="AED">AED</option>
	            <option value="ALL">ALL</option>
	            <option value="ANG">ANG</option>
	            <option value="ARS">ARS</option>
	            <option value="AWG">AWG</option>
	            <option value="BBD">BBD</option>
	            <option value="BDT">BDT</option>
	            <option value="BGN">BGN</option>
	            <option value="BHD">BHD</option>
	            <option value="BIF">BIF</option>
	            <option value="BMD">BMD</option>
	            <option value="BND">BND</option>
	            <option value="BOB">BOB</option>
	            <option value="BRL">BRL</option>
	            <option value="BSD">BSD</option>
	            <option value="BTN">BTN</option>
	            <option value="BWP">BWP</option>
	            <option value="BYR">BYR</option>
	            <option value="BZD">BZD</option>
	            <option value="CLP">CLP</option>
	            <option value="CNY">CNY</option>
	            <option value="COP">COP</option>
	            <option value="CRC">CRC</option>
	            <option value="CUP">CUP</option>
	            <option value="CVE">CVE</option>
	            <option value="CZK">CZK</option>
	            <option value="DJF">DJF</option>
	            <option value="DKK">DKK</option>
	            <option value="DOP">DOP</option>
	            <option value="DZD">DZD</option>
	            <option value="ECS">ECS</option>
	            <option value="EEK">EEK</option>
	            <option value="EGP">EGP</option>
	            <option value="ERN">ERN</option>
	            <option value="ETB">ETB</option>
	            <option value="FJD">FJD</option>
	            <option value="FKP">FKP</option>
	            <option value="GHC">GHC</option>
	            <option value="GIP">GIP</option>
	            <option value="GMD">GMD</option>
	            <option value="GNF">GNF</option>
	            <option value="GTQ">GTQ</option>
	            <option value="GYD">GYD</option>
	            <option value="HKD">HKD</option>
	            <option value="HNL">HNL</option>
	            <option value="HRK">HRK</option>
	            <option value="HTG">HTG</option>
	            <option value="HUF">HUF</option>
	            <option value="IDR">IDR</option>
	            <option value="ILS">ILS</option>
	            <option value="INR">INR</option>
	            <option value="IQD">IQD</option>
	            <option value="IRR">IRR</option>
	            <option value="ISK">ISK</option>
	            <option value="JMD">JMD</option>
	            <option value="JOD">JOD</option>
	            <option value="KES">KES</option>
	            <option value="KHR">KHR</option>
	            <option value="KMF">KMF</option>
	            <option value="KPW">KPW</option>
	            <option value="KRW">KRW</option>
	            <option value="KWD">KWD</option>
	            <option value="KYD">KYD</option>
	            <option value="KZT">KZT</option>
	            <option value="LAK">LAK</option>
	            <option value="LBP">LBP</option>
	            <option value="LKR">LKR</option>
	            <option value="LRD">LRD</option>
	            <option value="LSL">LSL</option>
	            <option value="LTL">LTL</option>
	            <option value="LVL">LVL</option>
	            <option value="LYD">LYD</option>
	            <option value="MAD">MAD</option>
	            <option value="MDL">MDL</option>
	            <option value="MKD">MKD</option>
	            <option value="MMK">MMK</option>
	            <option value="MNT">MNT</option>
	            <option value="MOP">MOP</option>
	            <option value="MRO">MRO</option>
	            <option value="MTL">MTL</option>
	            <option value="MUR">MUR</option>
	            <option value="MVR">MVR</option>
	            <option value="MWK">MWK</option>
	            <option value="MYR">MYR</option>
	            <option value="NAD">NAD</option>
	            <option value="NGN">NGN</option>
	            <option value="NIO">NIO</option>
	            <option value="NOK">NOK</option>
	            <option value="NPR">NPR</option>
	            <option value="NZD">NZD</option>
	            <option value="OMR">OMR</option>
	            <option value="PAB">PAB</option>
	            <option value="PEN">PEN</option>
	            <option value="PGK">PGK</option>
	            <option value="PHP">PHP</option>
	            <option value="PKR">PKR</option>
	            <option value="PLN">PLN</option>
	            <option value="PYG">PYG</option>
	            <option value="QAR">QAR</option>
	            <option value="RON">RON</option>
	            <option value="RUB">RUB</option>
	            <option value="RWF">RWF</option>
	            <option value="SAR">SAR</option>
	            <option value="SBD">SBD</option>
	            <option value="SCR">SCR</option>
	            <option value="SDG">SDG</option>
	            <option value="SGD">SGD</option>
	            <option value="SHP">SHP</option>
	            <option value="SIT">SIT</option>
	            <option value="SKK">SKK</option>
	            <option value="SLL">SLL</option>
	            <option value="SOS">SOS</option>
	            <option value="STD">STD</option>
	            <option value="SVC">SVC</option>
	            <option value="SYP">SYP</option>
	            <option value="SZL">SZL</option>
	            <option value="THB">THB</option>
	            <option value="TND">TND</option>
	            <option value="TOP">TOP</option>
	            <option value="TRY">TRY</option>
	            <option value="TTD">TTD</option>
	            <option value="TWD">TWD</option>
	            <option value="TZS">TZS</option>
	            <option value="UAH">UAH</option>
	            <option value="UGX">UGX</option>
	            <option value="UYU">UYU</option>
	            <option value="VEF">VEF</option>
	            <option value="VND">VND</option>
	            <option value="VUV">VUV</option>
	            <option value="WST">WST</option>
	            <option value="XAF">XAF</option>
	            <option value="XAG">XAG</option>
	            <option value="XAL">XAL</option>
	            <option value="XAU">XAU</option>
	            <option value="XCD">XCD</option>
	            <option value="XCP">XCP</option>
	            <option value="XOF">XOF</option>
	            <option value="XPD">XPD</option>
	            <option value="XPF">XPF</option>
	            <option value="XPT">XPT</option>
	            <option value="YER">YER</option>
	            <option value="ZAR">ZAR</option>
	            <option value="ZMK">ZMK</option>
	            <option value="ZWD">ZWD</option>
			</select>
			<b>{this.state.response} {this.state.second}</b>
    		</div>
    		</div>
		)
	}
}

export default GetMoney;