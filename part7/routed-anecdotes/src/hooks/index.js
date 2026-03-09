import { useState } from "react";

export const useInputField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    reset,
    fieldParams: {name, value, onChange}
  }
}