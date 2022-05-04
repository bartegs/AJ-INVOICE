import React from "react";
import classnames from "classnames";

interface InputProps {
  setState?: React.Dispatch<React.SetStateAction<string>>;
  handleValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  name: string;
  value: string | number;
  placeholder: string;
  id: string;
  additionalClasses?: string;
  required?: boolean;
  underlineColor?: "blue" | "grey";
  size?: "sm" | "md" | "lg";
  type?: "text" | "date";
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  setState,
  handleValueChange,
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
  function internalHandleValueChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setState(event.currentTarget.value);
  }

  return (
    <input
      onChange={
        handleValueChange !== undefined
          ? handleValueChange
          : internalHandleValueChange
      }
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
