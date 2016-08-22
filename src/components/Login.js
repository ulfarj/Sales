import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'react-bootstrap';
import { loginUser } from '../actions/account';

class Login extends Component {

  componentDidMount = () => {
    this.ssn.getInputDOMNode().focus();
  };

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.loginUser();
    }
  };

	onLogin = () => {
		this.loginUser();
	};

  loginUser = () => {
    const { dispatch } = this.props;
		dispatch(loginUser(this.ssn.getValue(), this.password.getValue()));
  };

	render(){
		const { dispatch } = this.props;

		return(
			<div style={{paddingTop: '20px'}}>
        <div>
           <Input label="Notendanafn" type="text" ref={(ref) => this.ssn = ref} />
           <Input label="Lykilorð" type="password" ref={(ref) => this.password = ref} />
           <div>
    				 <Button onClick={this.onLogin}>Innskrá</Button>
           </div>
         </div>
			</div>
		);
	}
}

Login.propTypes = {
  userId: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let userId = state.account.userId;
  return { userId }
}

export default connect(mapStateToProps)(Login);
