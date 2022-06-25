import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/profile_pic.jpeg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Melissa Valencia</div>
            <div className="brief_description">
            <p>Hello! I am Melissa Valencia, a senior at Dartmouth College majoring in Computer Science 
            and double minoring in Human-Centered Design and Spanish. I am from Los Angeles, California. 
            In my free time, I love going to the beach and biking around the city. I also 
            enjoy going to concerts, music festivals, and sports games! Along with that,
            I am a huge foodie, so I love trying out new places to eat.</p> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}
