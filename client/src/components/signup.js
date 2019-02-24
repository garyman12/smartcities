import React, { Component } from "react";
import "../css/login.css";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFirst: "",
      nameLast: "",
      email: "",
      age: "",
      zipCode: "",
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
    axios.post("/singup", this.state).then(res => {
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
              <form
                onSubmit={this.onSubmit}
                className="login100-form validate-form"
              >
                <span className="login100-form-title p-b-26">Sign Up</span>
                <span className="login100-form-title p-b-48">
                  <i className="zmdi zmdi-font" />
                </span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="First Name is required"
                >
                  <input
                    className="input100"
                    type="nameFirst"
                    name="nameFirst"
                    value={this.state.nameFirst}
                    onChange={this.onChange}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="First Name"
                  />
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Last Name is required"
                >
                  <input
                    className="input100"
                    type="nameLast"
                    name="nameLast"
                    value={this.state.nameLast}
                    onChange={this.onChange}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="Last Name"
                  />
                </div>

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
                  data-validate="Age is required"
                >
                  <input
                    className="input100"
                    type="age"
                    name="age"
                    value={this.state.age}
                    onChange={this.onChange}
                  />
                  <span className="focus-input100" data-placeholder="Age" />
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Zip Code is required"
                >
                  <input
                    className="input100"
                    type="zipCode"
                    name="zipCode"
                    value={this.state.zipCode}
                    onChange={this.onChange}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="Zip Code"
                  />
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
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
