import React from 'react';

var PassportReqs = React.createClass({
	render () {
		return (
			<div className='passportInfo'>
			<h1>Passport Information</h1>
			<p>All persons traveling outside of the United States are required to present a passport or other valid travel document to enter or re-enter the United States.</p>
			<button><a href='https://travel.state.gov/content/passports/en/passports/information/where-to-apply.html' target="_blank">Apply for Passport</a></button>
			<div className='passportRules'>
				<h2>First time applicants</h2>
				<b>You must apply in person if:</b>
				<ul>
					<li>You are applying for your first US passport</li>
					<li>You are under the age of 16</li>
					<li>Your last passport was issued before you were 16 years old, or more than 15 years ago</li>
					<li>Your last passport was lost, stolen, or damaged</li>
					<li>Your legal name has changed</li>
				</ul>
				<p>If the above list does not apply, you have the option to <a href="https://travel.state.gov/content/passports/en/passports/renew.html">renew your passport by mail</a></p>
			</div>
			<div className='passportPricing'>
				<h2>Pricing</h2>
				<table>
				<tbody>
				  <tr>
				    <th>Type of Applicant</th>
				    <th>Passport Book</th>
				    <th>Passport Card</th>
				  </tr>
				  <tr>
				    <td>Adult first time or renewal</td>
				    <td>$110</td>
				    <td>$30</td>
				  </tr>
				  <tr>
				    <td>Child (15 years old)</td>
				    <td>$80</td>
				    <td>$15</td>
				  </tr>
				</tbody>
				</table>
				<p><a href="https://travel.state.gov/content/passports/en/passports/information/fees.html">More information about fees</a></p>
			</div>
			</div>
		)
	}
})

export default PassportReqs