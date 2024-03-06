import { HashLoader } from "react-spinners";

export default function Loader() {
  return (
    <div style={{ display: "flex", width: "100%", height: "50vh", alignItems: "center", justifyContent: "center" }}>
      <HashLoader color="#5CB85C" size={150} speedMultiplier={2} />
    </div>
  );
}
