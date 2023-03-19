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
  cursor: pointer;
  border: 0px;
  background-color: ${Colors.BlueGrey};
  text-decoration: underline;
  color: ${Colors.Black};
  font-size: 25px;
  margin-top: 40px;
`;
