import React, { Component } from "react";
import "../css/login.css";
import "../css/main.css";
import "../css/util.css";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    window.sessionStorage.removeItem("redirect");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post("/login", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="limiter">
		      <div className="container-login100">
			      <div className="wrap-login100">
				      <form onSubmit={this.onSubmit} className="login100-form validate-form">
					      <span className="login100-form-title p-b-26">
						      Welcome
					      </span>
					      <span className="login100-form-title p-b-48">
						      <i className="zmdi zmdi-font"></i>
					      </span>

					      <div className="wrap-input100 validate-input" data-validate="Email is required">
                  <input 
                    className="input100" 
                    type="email"
			              name="email"
			              value={this.state.email}
			              onChange={this.onChange}
                  />
						      <span className="focus-input100" data-placeholder="Email"></span>
					      </div>

					<div className="wrap-input100 validate-input" data-validate="Password is required">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
            <input 
              className="input100"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
						<span className="focus-input100" data-placeholder="Password"></span>
					</div>

					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn" type="submit">
								Login
							</button>
						</div>
					</div>

					<div className="text-center p-t-115">
						<span className="txt1">
							Don’t have an account?
						</span>

						<a className="txt2" href="/forgotPassword">
							Sign Up
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
      </div>
    );
  }
}

export default Login;
