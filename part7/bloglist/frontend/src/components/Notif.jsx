import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';

const Notif = () => {
  const reduxnotif = useSelector((state) => state.notification);

  if (reduxnotif.content === null) {
    return null;
  }

  return (
    <Alert
      /*style={{
        color: !reduxnotif.err ? "green" : "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}*/
     severity={!reduxnotif.err ? "success" : "error"}
    >
      {reduxnotif.content}
    </Alert>
  );
};

export default Notif;
