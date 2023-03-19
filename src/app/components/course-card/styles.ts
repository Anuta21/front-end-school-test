import styled from "styled-components";
import { Colors } from "../../common/assets";

export const Title = styled.div`
  height: 40px;
  position: relative;
  background: ${Colors.BlueGrey};

  font-size: 26px;
  overflow: hidden;

  @media (max-device-width: 480px) {
    height: 70px;
  }
`;

export const Content = styled.div`
  position: relative;
  margin: 20px 0px 0px 20px;
  height: 550px;
`;

export const Image = styled.img`
  border: 3px solid ${Colors.BlueGrey};
  border-radius: 25px;
  height: 180px;

  @media (max-device-width: 480px) {
    height: 100px;
  }
`;

export const Description = styled.div`
  margin-top: 20px;
  background: ${Colors.BlueGrey};
  border-radius: 25px;
  transform: translate(-40px, 0%);

  font-size: 20px;
`;

export const DescriptionText = styled.div`
  transform: translate(20%, 0%);
  width: 600px;

  @media (max-device-width: 480px) {
    transform: translate(30%, 0%);
    width: 200px;
  }
`;

export const ParamsComponent = styled.div`
  transform: translate(40px, 0%);
  margin-top: 20px;
  background: ${Colors.BlueGrey};
  border-radius: 25px;

  color: ${Colors.Black};
  font-size: 18px;
`;

export const Wrapper = styled.div`
  height: 610px;
  width: 80vw;

  background: ${Colors.Grey};
  border-radius: 25px;
  overflow: hidden;
`;

export const Button = styled.button`
  border: 2px solid ${Colors.White};
  border-radius: 25px;

  height: 30px;
  width: 80px;
  position: absolute;
  bottom: 20px;
  right: 50px;

  background-color: ${Colors.BlueGrey};
  cursor: pointer;

  @media (max-device-width: 480px) {
    bottom: 45px;
  }
`;
