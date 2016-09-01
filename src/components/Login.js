import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Input, Button } from 'react-bootstrap';
import { loginUser } from '../actions/account';
import { Alert } from 'react-bootstrap';

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
		const { dispatch, error } = this.props;

		return(
			<div style={{paddingTop: '20px'}} className="col-xs-12 col-sm-6">
        {error &&
          <Alert bsStyle="danger">
            Ekki tókst að innskrá notanda.
          </Alert>
        }
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
  error: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let userId = state.account.userId;
  let error = state.account.error ? true : false;
  return { userId, error }
}

export default connect(mapStateToProps)(Login);
