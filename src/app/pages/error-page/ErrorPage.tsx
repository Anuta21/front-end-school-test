import { useNavigate } from "react-router-dom";
import { BackButton, ErrorMessage, Wrapper } from "./styles";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ErrorMessage>Something went wrong</ErrorMessage>
      <BackButton onClick={() => navigate("/courses/")}>
        Go back to courses
      </BackButton>
    </Wrapper>
  );
};
