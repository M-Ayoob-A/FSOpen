import { useSelector } from "react-redux";

const Notif = () => {
  const reduxnotif = useSelector((state) => state.notification);

  if (reduxnotif.content === null) {
    return null;
  }

  return (
    <div
      style={{
        color: !reduxnotif.err ? "green" : "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {reduxnotif.content}
    </div>
  );
};

export default Notif;
