import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            custom: []
        }
    }
    componentWillMount() {
        fetch('custom.json')
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              custom: data.starkey,
            });
          });
    }
	render() {
		return (
			<div className='login'>
				<h1>Welcome to the {this.state.custom.companyName} Travel Portal</h1>
				<div className='loginForm'>
					<input type="text" placeholder='Username'/>
					<input type="text" placeholder='password0123'/>
					<Link to='home'>Login</Link>
					<Link to='home'>Forgot Password</Link>
				</div>
			</div>
		)
	}
}

export default Login