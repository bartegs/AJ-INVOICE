import React from "react";
import classnames from "classnames";

interface ButtonProps {
  type: "button" | "reset" | "submit";
  color: "blue" | "red";
  onClick: () => void;
  text: string;
  additionalClasses?: string;
  isDisabled: boolean;
  hasFixedWidth?: boolean;
  width?: "sm" | "md" | "lg";
}

export default function Button({
  type = "button",
  color = "blue",
  onClick,
  text,
  additionalClasses,
  isDisabled = true,
  hasFixedWidth = false,
  width = "sm",
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={classnames(
        "button",
        hasFixedWidth && `button--${width}`,
        !isDisabled ? `button--${color}` : "button--disabled",
        additionalClasses
      )}
      type={type}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
