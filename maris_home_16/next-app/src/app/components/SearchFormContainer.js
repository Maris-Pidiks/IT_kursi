import React from "react";
import Form from "./Form";

export default function SearchFormContainer({
  onSubmit,
  inputValue,
  onInputChange,
  placeholder,
  buttonText,
}) {
  return (
    <Form
      onSubmit={onSubmit}
      inputValue={inputValue}
      onInputChange={onInputChange}
      placeholder={placeholder}
      buttonText={buttonText}
    />
  );
}
