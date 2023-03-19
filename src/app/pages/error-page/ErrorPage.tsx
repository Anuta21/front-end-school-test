import { useNavigate } from "react-router-dom";
import { BackButton, Wrapper } from "./styles";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div style={{ marginTop: "40vh", width: "80vw", textAlign: "center" }}>
        Something went wrong
      </div>
      <BackButton onClick={() => navigate("/courses/")}>
        Go back to courses
      </BackButton>
    </Wrapper>
  );
};
