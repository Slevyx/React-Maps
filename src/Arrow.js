import React from "react";
import arrowImage from "./Arrow.png";

export default function Arrow(props) {
  return (
    <div className="arrow_container">
      <img
        className="arrow_image"
        src={arrowImage}
        alt="..."
        onClick={props.backToList}
      />
      <div className="arrow_text">Back to States List</div>
    </div>
  );
}
