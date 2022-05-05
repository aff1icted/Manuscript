import React from "react";
import '../../styles/Slider.css'
import LeftArrow from '../../static/angle-left.svg'
import RightArrow from '../../static/angle-right.svg'

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? RightArrow : LeftArrow} />
    </button>
  );
}