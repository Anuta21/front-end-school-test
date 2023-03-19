import styled from "styled-components";
import { Colors } from "../../common/assets";

export const Title = styled.div`
  height: 40px;
  position: relative;
  background: ${Colors.BlueGrey};
  font-size: 26px;
  overflow: hidden;
`;
export const Content = styled.div`
  position: relative;
  margin: 20px 0px 0px 20px;
  //color: ${Colors.White};
  height: 550px;
`;
export const Image = styled.img`
  border: 3px solid ${Colors.BlueGrey};
  border-radius: 25px;
  height: 180px;
`;
export const Description = styled.div`
  margin-top: 20px;
  background: ${Colors.BlueGrey};
  border-radius: 25px;
  transform: translate(-40px, 0%);
  font-size: 20px;
`;
export const ParamsComponent = styled.div`
  font-size: 18px;
  margin-top: 20px;
  transform: translate(40px, 0%);
  //width: 500px;
  background: ${Colors.BlueGrey};
  //color: ${Colors.Grey};
  border-radius: 25px;
  color: ${Colors.Black};
`;
export const LessonsCount = styled.div``;
export const Skills = styled.div`
  margin-top: 10px;
`;
export const Rating = styled.div`
  margin-top: 10px;
`;
export const Wrapper = styled.div`
  height: 610px;
  width: 800px;
  //border: 2px solid ${Colors.Grey};
  background: ${Colors.Grey};
  border-radius: 25px;
  overflow: hidden;
`;

export const Button = styled.button`
  border: 2px solid ${Colors.White};
  background-color: ${Colors.BlueGrey};
  border-radius: 25px;
  height: 30px;
  width: 80px;
  position: absolute;
  bottom: 20px;
  right: 50px;
  cursor: pointer;
`;
export const ButtonText = styled.div`
  color: ${Colors.White};
`;
