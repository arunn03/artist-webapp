import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/Carousel.css";

const Carousel = ({ children, closable = false, onClose = () => {} }) => {
  // Configuration options for the carousel
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(children);

  return (
    <div className="carousel-container">
      {closable && (
        <button className="text-white close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}

      <div className="carousel">
        <Slider {...settings}>{children}</Slider>
      </div>
    </div>
  );
};

export default Carousel;
