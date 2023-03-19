import styled from "styled-components";
import { Colors } from "../../common/assets";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  color: ${Colors.White};
  font-size: 45px;
`;

export const BackButton = styled.button`
  margin-top: 40px;
  border: 0px;
  background-color: ${Colors.BlueGrey};
  cursor: pointer;

  text-decoration: underline;
  color: ${Colors.Black};
  font-size: 25px;
`;

export const ErrorMessage = styled.div`
  margin-top: 40vh;
  width: 80vw;
  text-align: center;
`;
