import styled from "styled-components";
import { Colors } from "../../common/assets";
import { ITitleProps } from "./models";

export const Title = styled.div<ITitleProps>`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Colors.BlueGrey};
  font-size: 26px;
  overflow: hidden;
  text-decoration: ${(props) => (props.unlocked ? "underline" : "default")};
  cursor: ${(props) => (props.unlocked ? "pointer" : "default")};
`;
export const Content = styled.div`
  position: relative;
  margin: 20px 0px 0px 20px;
  //color: ${Colors.White};
  //height: 550px;
`;
