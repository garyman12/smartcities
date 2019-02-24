import React, { Component } from "react";
import "../css/login.css";
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
    /*axios
      .post("/api/signup/createUser", {
        user: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          rank: "1",
          email: this.state.email,
          primary_dojo: "1",
          birthday: this.state.birthday
        },
        token: sessionStorage.getItem("id")
      })
      .then(res => {
        res = res.data;
        console.log(res);
        if (res.success === "false") {
          this.setState({ err: true });
        }
      });*/
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <div className="p-t-31 p-b-9">
            <span className="txt1">Email</span>
          </div>
          <div className="wrap-input100" data-validate="Email is required">
            <input
              className="input100"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
            />
            <span className="focus-input" />
          </div>

          <div className="p-t-13 p-b-9">
            <span className="txt1">Password</span>
            <br />
            <a href="/forgotPassword" className="txt2 bo1 m-l-5">
              Forgot?
            </a>
          </div>

          <div className="wrap-input100" data-validate="Password is required">
            <input
              className="input100"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <span className="focus-input100" />
          </div>

          <div className="container-login100-form-btn m-t-17">
            <button type="submit" className="login100-form-btn">
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
