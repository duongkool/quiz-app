import SyncLoader from "react-spinners/SyncLoader";
const loading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "50px",
  };
  return (
    <div style={style}>
      <SyncLoader color="#36d7b7" />
    </div>
  );
};
export default loading;
