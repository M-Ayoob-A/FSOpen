import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue("")
  }

  return {
    fieldAttrs: {
      type,
      value,
      onChange
    },
    value,
    clear
  }
}

export default useField