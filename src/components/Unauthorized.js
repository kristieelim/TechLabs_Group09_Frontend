import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <article style={{ padding: "100px" }}>
      <h1>Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </article>
  );
};

export default Unauthorized;
