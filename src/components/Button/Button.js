import React from "react";
import "./Button.scss";

const STYLES = ["btn__default", "btn__round", "btn__simple", "btn__simple__def"];
const SIZES = ["btn__small", "btn__regular", "btn__large"];
const COLORS = ["btn__def", "btn__primary", "btn__success", "btn__danger", "btn__info"];

export const Button = ({
  children,
  buttonStyle,
  buttonSize,
  buttonColor,
  link,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[1];
  const checkButtonColor = COLORS.includes(buttonColor)
    ? buttonColor
    : COLORS[0];

  return (
    <a
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
      href={link}
    >
      {children}
    </a>
  );
};
