import React from "react";
import '../../styles/Slider.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
//import leftArrow from "./icons/left-arrow.svg";
//import rightArrow from "./icons/right-arrow.svg";
import LeftArrow from '../../static/angle-left.svg'
import RightArrow from '../../static/angle-right.svg'

export default function BtnSlider({ direction, moveSlide }) {
  console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? RightArrow : LeftArrow} />
    </button>
  );
}