import React, { Component } from "react";

class App extends Component {
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        axios.post("/profile", this.state).then(res => {
            res = res.data;
            console.log(res);
        });
    }
    render() {
        return (
            <h1></h1>
        );
    }
}

export default Profile;