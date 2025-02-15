import React from "react";
import slider1 from "../../../assets/images/slide-1.jpg";
import slider2 from "../../../assets/images/slider-2.jpg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <>
      <div className="container mt-10">
        <Slider {...settings}>
          <img src={slider1} alt="home" className="h-[400px] object-cover object-right"/>
          <img src={slider2} alt="home" className="h-[400px] object-cover object-right"/>
        </Slider>
      </div>
    </>
  );
}
