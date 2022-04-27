import React from "react";

import classnames from "classnames";

export type IconType = "confirm" | "remove" | "new";
export type IconColor = "white" | "blue" | "red";

export interface IconProps {
  icon: IconType;
  color?: IconColor;
  size?: "sm" | "lg";
  additionalClasses?: string;
  onClick?: () => void;
}

export default function Icon({
  icon,
  color,
  size,
  additionalClasses,
  onClick,
}: IconProps): JSX.Element {
  return (
    <span
      onClick={onClick}
      className={classnames(
        "icon",
        `icon--${icon}`,
        `icon--${color}`,
        `icon--${size}`,
        `${additionalClasses}`
      )}
    ></span>
  );
}
