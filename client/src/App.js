import React, { Component } from 'react';
import logo from './img/logo.svg';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        					<div class="p-t-31 p-b-9">
						<span class="txt1">
							Username
						</span>
					</div>
					<div class="wrap-input100" data-validate = "Username is required">
						<input class="input100" type="text" name="username"/>
						<span class="focus-input"></span>
					</div>
					
					<div class="p-t-13 p-b-9">
						<span class="txt1">
							Password
						</span>
            <br/>
						<a href="/forgotPassword" class="txt2 bo1 m-l-5">
							Forgot?
						</a>
					</div>
	

					<div class="wrap-input100" data-validate = "Password is required">
						<input class="input100" type="password" name="password"/>
						<span class="focus-input100"></span>
					</div>

					<div class="container-login100-form-btn m-t-17">
						<button class="login100-form-btn">
							Sign In
						</button>
					</div>
      </div>
    );
  }
}

export default App;
