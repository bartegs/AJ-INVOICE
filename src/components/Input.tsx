import React from "react";
import classnames from "classnames";

interface InputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  value: string;
  placeholder: string;
  id: string;
  additionalClasses?: string;
  required?: boolean;
  underlineColor?: "blue" | "grey";
  size?: "sm" | "md" | "lg";
  type?: "text" | "date";
  onFocus?: any;
  onBlur?: any;
}

export default function Input({
  setState,
  name,
  value,
  placeholder,
  id,
  additionalClasses,
  required,
  underlineColor,
  size,
  type,
  onFocus,
  onBlur,
}: InputProps): JSX.Element {
  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState(event.currentTarget.value);
  }

  return (
    <input
      onChange={handleValueChange}
      className={classnames(
        "input",
        `input--${size}`,
        `input--${underlineColor}-underline`,
        additionalClasses
      )}
      type={type}
      name={name}
      value={value}
      id={id}
      placeholder={placeholder}
      required={required}
      onFocus={onFocus}
      onBlur={onBlur}
    ></input>
  );
}
