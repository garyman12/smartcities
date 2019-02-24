import React, { Component } from "react";
import Titleboard from "./titleboard";
import axios from "axios";
import "../css/postDetails.css";
import Grid from "@material-ui/core/Grid";


class Profile extends Component {
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
            <div className="profile-content">
                <Titleboard />
                <h1></h1>
            </div>
        );
    }
}

export default Profile;
