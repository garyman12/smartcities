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
    /*axios.post("/singup", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
    */
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <div className="p-t-31 p-b-9">
            <span className="txt1">First Name</span>
          </div>
          <div className="wrap-input100" data-validate="First name is required">
            <input
              className="input100"
              name="nameFirst"
              value={this.state.nameFirst}
              onChange={this.onChange}
              type="text"
            />
            <span className="focus-input" />
          </div>

          <div className="p-t-31 p-b-9">
            <span className="txt1">Last Name</span>
          </div>
          <div className="wrap-input100" data-validate="Last name is required">
            <input
              className="input100"
              name="nameLast"
              value={this.state.nameLast}
              onChange={this.onChange}
              type="text"
            />
            <span className="focus-input" />
          </div>

          <div className="p-t-31 p-b-9">
            <span className="txt1">Email</span>
          </div>
          <div className="wrap-input100" data-validate="Email is required">
            <input
              className="input100"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
            />
            <span className="focus-input" />
          </div>

          <div className="p-t-31 p-b-9">
            <span className="txt1">Age</span>
          </div>
          <div className="wrap-input100" data-validate="Age is required">
            <input
              className="input100"
              name="age"
              value={this.state.age}
              onChange={this.onChange}
              type="text"
            />
            <span className="focus-input" />
          </div>

          <div className="p-t-31 p-b-9">
            <span className="txt1">Zip Code</span>
          </div>
          <div className="wrap-input100" data-validate="Zip code is required">
            <input
              className="input100"
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.onChange}
              type="text"
            />
            <span className="focus-input" />
          </div>

          <div className="p-t-13 p-b-9">
            <span className="txt1">Password</span>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
