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
    axios.post("/login", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="outerCenter">
          <div className="middleCenter">
            <div className="innerCenter">
              <form onSubmit={this.onSubmit}>
                <div className="">
                  <span className="">Email</span>
                </div>
                <div className="" data-validate="Email is required">
                  <input
                    className=""
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <span className=""/>
                </div>

                <div className="">
                  <span className="">Password</span>
                  <br />
                  <a href="/forgotPassword" className="">
                    Forgot?
                  </a>
                </div>

                <div className="" data-validate="Password is required">
                  <input
                    className=""
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <span className="" />
                </div>

                <div className="">
                  <button type="submit" className="">
                    Sign In
                  </button>
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
