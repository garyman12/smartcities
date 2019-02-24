import React, { Component } from "react";
import "../css/login.css";
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
      if(res.success == true){
        sessionStorage.setItem("jwtToken", res.jwtInfo)
        this.props.history.push('/');
      }else{
        this.props.history.push('/login');
      }
    });
  }

  render() {
    return (
      <div className="login">
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <form
                onSubmit={this.onSubmit}
                className="login100-form validate-form"
              >
                <span className="login100-form-title p-b-10">Welcome</span>
                <span className="login100-form-title p-b-48">
                  <i className="zmdi zmdi-font" />
                </span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Email is required"
                >
                  <input
                    className="input100"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <span className="focus-input100" data-placeholder="Email" />
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <span className="btn-show-pass">
                    <i className="zmdi zmdi-eye" />
                  </span>
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="Password"
                  />
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button className="login100-form-btn" type="submit">
                      Login
                    </button>
                  </div>
                </div>

                <div className="text-center p-t-11">
                  <span className="txt1">Don’t have an account?</span>
                  <br/>
                  <a className="txt2" href="/signup">
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
