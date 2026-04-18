import { useState } from "react";
import Button from '@mui/material/Button';


const Toggle = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleShow = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <Button onClick={toggleShow} variant="outlined">{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleShow} variant="outlined" color="error">Cancel</Button>
      </div>
    </>
  );
};

export default Toggle;
