import React, { useState } from "react";

import {Typography, Carousel, Button, Card, Space, Badge, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserTie,
  faDoorOpen,
  faAward,
  faStar,
  faCircleChevronRight,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

import hero1 from "../../assets/images/hero1.png";
import hero2 from "../../assets/images/hero2.jpeg";
import Navbar from "../../components/Navbar";

import CheckAvailability from "../../components/CheckAvailability";

const Home = () => {
  const contentStyle1 = {
    height: "80vh",
    width: "100vw",
    color: "#fff",
    backgroundImage: `url(${hero1})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const contentStyle2 = {
    height: "80vh",
    width: "100vw",
    color: "#fff",
    backgroundImage: `url(${hero2})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const contentStyle3 = {
    height: "80vh",
    width: "100vw",
    color: "#fff",
    backgroundImage: `url('https://i.pinimg.com/564x/bc/d7/21/bcd7214edec2598cb1d2db8ce1a0a6bd.jpg')`,
    backgroundSize: "fill",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const accomodationContentStyle = {
    background: "#364d79",

    display: "flex",
  };
  const onChange = (currentSlide) => {
    return currentSlide;
  };

  const [loading, setLoading] = useState(false);
  const setLoader = (isLoading) => {
    setLoading(isLoading);
  };
  return (
    <Spin tip="Searching for rooms" spinning={loading}>
      <Carousel autoplay effect="fade">
        <div className="carousel">
          <div style={contentStyle1}>
           
            <div className="container dates-guest-container">
              <CheckAvailability setLoader={setLoader} />
            </div>
          </div>
        </div>
        <div>
          <div style={contentStyle2}>
           
            <div className="container dates-guest-container">
              
              <CheckAvailability setLoader={setLoader} />
            </div>
          </div>
        </div>
        <div>
          <div style={contentStyle3}>
          
            <div className="container dates-guest-container">
              <CheckAvailability setLoader={setLoader} />
            </div>
          </div>
        </div>
        <div>
          <div style={contentStyle2}>
         
            <div className="container dates-guest-container">
              <CheckAvailability setLoader={setLoader} />
            </div>
          </div>
        </div>
      </Carousel>

      <div className="About">
        <div className="container flex about-container">
          <div className="about-left">
            <div className="logo-small">
              <img src={require("../../assets/images/logo.png")}></img>
            </div>
            <div>
              <h1>CASA CABALLERO</h1>
              <h3>A modern Spanish hotel</h3>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor{" "}
              </p>
              <div className="flex about-learn-more">
                <p>Learn More</p>
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </div>
            </div>
          </div>
          <div className="about-right">
            <div>
              <img src={require("../../assets/images/about.jpeg")}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="Achievement">
        <div className="container flex achievement-section">
          <div className="flex flex-achievement">
            <FontAwesomeIcon icon={faDoorOpen} />
            <h1>360</h1>
            <h3>ROOMS</h3>
          </div>
          <div className="flex flex-achievement">
            <FontAwesomeIcon icon={faUserTie} />
            <h1>500+</h1>
            <h3>SATISFIED GUESTS</h3>
          </div>
          <div className="flex flex-achievement">
            <FontAwesomeIcon icon={faAward} />
            <h1>45</h1>
            <h3>AWARDS</h3>
          </div>
          <div className="flex flex-achievement">
            <FontAwesomeIcon icon={faStar} />
            <h1>4.5</h1>
            <h3>RATINGS</h3>
          </div>
        </div>
      </div>
      <div className="Accomodations">
        <div className="container">
          <div className="logo-small">
            <img src={require("../../assets/images/logo.png")}></img>
          </div>
          <h1>ACCOMODATIONS</h1>
          <h3>Modern Spanish style</h3>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo{" "}
          </p>
          <Carousel dotPosition="top" afterChange={onChange}>
            <div className="carousel">
              <div style={accomodationContentStyle}>
                <div className="room-carousel">
                  <img
                    src={require("../../assets/images/room1.png")}
                    className="room1"
                  ></img>
                  <div className="flex room-info-container">
                    <div className="room-info">
                      <h1>El Cuarto</h1>
                      <h3>Deluxe Rooms</h3>
                      <h4>P 7,800 per night</h4>
                    </div>
                    <div className="book-buttons">
                      <Button>Read More</Button>
                      <Button>Book Now</Button>
                    </div>
                  </div>
                </div>
                <div className="room-carousel">
                  <img src={require("../../assets/images/room2.jpeg")}></img>
                  <div className="flex room-info-container">
                    <div className="room-info">
                      <h1>Primera</h1>
                      <h3>Premium Room</h3>
                      <h4>P 9,500 per night</h4>
                    </div>
                    <div className="book-buttons">
                      <Button>Read More</Button>
                      <Button>Book Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel">
              <div style={accomodationContentStyle}>
                <div className="room-carousel">
                  <img src={require("../../assets/images/room1.png")}></img>
                </div>
                <div className="room-carousel">
                  <img src={require("../../assets/images/room2.jpeg")}></img>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="Facilities">
        <div className="container">
          <div className="logo-small">
            <img src={require("../../assets/images/logo.png")}></img>
          </div>
          <h1>FACILITIES & SERVICES</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy{" "}
          </p>
          <div className="facility-gallery flex">
            <div className="facililty-card flex cafe">
              <div>
                <h1>CAFE & RESTO</h1>
                <p>Opens 10am - 9pm</p>
              </div>
              <div className="flex">
                <p>More Details</p>
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </div>
            </div>
            <div className="facililty-card flex spa">
              <div>
                <h1>SPA</h1>
                <p>Opens 6pm - 11pm</p>
              </div>
              <div className="flex">
                <p>More Details</p>
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </div>
            </div>
            <div className="facililty-card flex pool">
              <div>
                <h1>GARDEN POOL</h1>
                <p>Opens 10am - 10pm</p>
              </div>
              <div className="flex">
                <p>More Details</p>
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="SpecialOffer">
        <div className="container">
          <div className="logo-small">
            <img src={require("../../assets/images/logo.png")}></img>
          </div>
          <h1>SPECIAL OFFERS</h1>
          <p>
            Enjoy these exclusive promos when you sign-up as a CASA CABALLERO
            member.
          </p>
          <div className="room-member flex">
            <Badge.Ribbon text="10% OFF" color="red" size="large">
              <div size="small" className="room-discount flex">
                <FontAwesomeIcon icon={faGift} />
                <h1>Member Room Discount</h1>
                <h3>10% off on all rooms</h3>
                <Button>Book Now</Button>
              </div>
            </Badge.Ribbon>
            <Badge.Ribbon text="10% OFF" color="red" size="large">
              <div size="small" className="suite-discount flex">
                <FontAwesomeIcon icon={faGift} />
                <h1>Member Suite Discount</h1>
                <h3>10% off on all rooms</h3>
                <Button>Book Now</Button>
              </div>
            </Badge.Ribbon>
          </div>
        </div>
      </div>
      <div className="Contact">
        <div className="container flex">
          <div className="contact-left">
            <h1>Connect with us</h1>
            <h3>Social Media Accounts</h3>
            <div className="flex">
              <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
            </div>
          </div>
          <div className="contact-right"></div>
        </div>
      </div>
    </Spin>
  );
};

export default Home;
