import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHub from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/rishav_02_12";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        {/* <Typography component="h1">About Us</Typography> */}
<h1>About</h1>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dmnafqaa3/image/upload/v1689225910/products/tphtfxcyxl3rlf9oskod.jpg"
              alt="Founder"
            />
       <h2>Rishav Anand</h2>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
It is a E-commerce website created for project purpose
            </span>
          </div>
          <div className="aboutSectionContainer2">
            {/* <Typography component="h2">Our Brands</Typography> */}
            <h2>
                Our Profile's
            </h2>
            <a
              href="https://github.com/Rishav2k21"
              target="blank"
            >
              <GitHub className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/rishav_02_12" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
