import React from "react";
import { ICourseCardProps } from "./models";
import {
  Description,
  LessonsCount,
  Skills,
  Title,
  Image,
  Rating,
  Wrapper,
  Content,
  ParamsComponent,
  Button,
  ButtonText,
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
    <>
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
              <LessonsCount>Lessons: {lessonsCount}</LessonsCount>
              <Skills>
                {skills ? (
                  <>
                    Skills:
                    {skills.map((skill) => (
                      <li>{skill}</li>
                    ))}{" "}
                  </>
                ) : (
                  <>No skills</>
                )}
              </Skills>

              <Rating>Rating: {rating}</Rating>
            </div>
          </ParamsComponent>
          <Button onClick={() => onClickFunction(id)}>
            <ButtonText>Choose</ButtonText>
          </Button>
        </Content>
      </Wrapper>
    </>
  );
};
