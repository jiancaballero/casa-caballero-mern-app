import React from "react";


import { Carousel, Button } from "antd";
import hero1 from "../../assets/images/hero1.png";
import Navbar from "../../components/Navbar";
import { Space } from "antd";
import CheckAvailability from "../../components/CheckAvailability";

const Home = () => {
 
  const contentStyle = {
    height: "100vh",
    width: "100vw",
    color: "#fff",
    backgroundImage: `url(${hero1})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };


  
  return (
    <div className="Main">
      <Carousel autoplay effect="fade">
        <div className="carousel">
          <h1 style={contentStyle}>
            A Modern Spanish Hotel
            <Button type="primary" size="large">
              Book Now
            </Button>
          </h1>
        </div>
        <div>
          <h1 style={contentStyle}>
            World Class Facilities
            <Button type="primary" size="large">
              Primary Button
            </Button>
          </h1>
        </div>
        <div>
          <h1 style={contentStyle}>
            Excellente Service
            <Button type="primary" size="large">
              Primary Button
            </Button>
          </h1>
        </div>
        <div>
          <h1 style={contentStyle}>
            4
            <Button type="primary" size="large">
              Primary Button
            </Button>
          </h1>
        </div>
      </Carousel>

      <div>
        
       <CheckAvailability/>
      </div>
    </div>
  );
};

export default Home;
