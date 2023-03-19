import styled from "styled-components";
import { Colors } from "../../common/assets";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  color: ${Colors.White};
  margin-bottom: 50px;
`;

export const Title = styled.div`
  margin: 20px 0px 20px 0px;
  font-size: 30px;

  @media (max-device-width: 480px) {
    margin-top: 40px;
    width: 80vw;
  }
`;

export const Description = styled.div`
  @media (max-device-width: 480px) {
    width: 80vw;
  }
`;

export const BackButton = styled.button`
  border: 0px;
  background-color: ${Colors.BlueGrey};
  transform: translate(5vw, 5vh);
  cursor: pointer;

  text-decoration: underline;
  color: ${Colors.Black};
  font-size: 20px;

  @media (max-device-width: 480px) {
    transform: translate(4vw, 2vh);
  }
`;
