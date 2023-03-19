import React from "react";
import { Colors } from "../../common/assets";
import { ICourseCardProps } from "./models";
import {
  Description,
  Title,
  Image,
  Wrapper,
  Content,
  ParamsComponent,
  Button,
  DescriptionText,
} from "./styles";

export const CourseCardComponent: React.FC<ICourseCardProps> = ({
  id,
  title,
  imageLink,
  description,
  lessonsCount,
  skills,
  rating,
  onClickFunction,
}) => {
  return (
    <Wrapper>
      <Title>
        <div style={{ margin: "5px 0px 0px 20px" }}>{title}</div>
      </Title>
      <Content>
        <Image src={imageLink}></Image>
        <Description>
          <DescriptionText>{description}</DescriptionText>
        </Description>
        <ParamsComponent>
          <div style={{ margin: "5px 0px 0px 20px" }}>
            <div>Lessons: {lessonsCount}</div>
            <div style={{ marginTop: "10px" }}>
              {skills ? (
                <>
                  Skills:
                  {skills.map((skill, id) => (
                    <li key={id}>{skill}</li>
                  ))}{" "}
                </>
              ) : (
                <>No skills</>
              )}
            </div>

            <div style={{ marginTop: "10px" }}>Rating: {rating}</div>
          </div>
        </ParamsComponent>
        <Button onClick={() => onClickFunction(id)}>
          <div style={{ color: Colors.White }}>Choose</div>
        </Button>
      </Content>
    </Wrapper>
  );
};
