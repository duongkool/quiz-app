import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="btn-home">
      <button onClick={() => navigate("/quiz")}>Start quiz</button>
    </div>
  );
};
export default Home;
