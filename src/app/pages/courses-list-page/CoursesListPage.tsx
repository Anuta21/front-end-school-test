import React, { useEffect, useState } from "react";
import { Client, ICourse } from "../../services";
import { CourseCardComponent } from "../../components/course-card";
import { Wrapper } from "./styles";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Pagination } from "@mui/material";
import { AxiosError } from "axios";
import { authErrorResponse } from "../../services/controllers/constants";
import { coursesListPageSlice, useAppSelector } from "../../redux";
import { useDispatch } from "react-redux";

export const CoursesListPage: React.FC = () => {
  const { token } = useAppSelector(
    (state) => state.persistedReducer.coursesListPage
  );
  const { setToken, setCourseId } = coursesListPageSlice.actions;
  const dispatch = useDispatch();

  const client = new Client();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([] as Array<ICourse>);

  useEffect(() => {
    async function getData() {
      async function getToken() {
        try {
          const responseData = (await client.auth.getToken()).data;
          dispatch(setToken(responseData.token));
          return responseData.token;
        } catch (error) {
          console.log(error);
          return;
        }
      }

      async function getCourses(token: string) {
        try {
          const responseData = (await client.courses.getCourses(token)).data;
          setCourses(responseData.courses.reverse());
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              return authErrorResponse;
            }
          }
        }
      }

      const response = await getCourses(token);
      if (response === authErrorResponse) {
        const newToken = await getToken();
        await getCourses(newToken);
      }
    }

    getData();
  }, []);

  return (
    <Wrapper>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div style={{ marginTop: "20px" }}>
            <CourseCardComponent
              key={course.id}
              id={course.id}
              title={course.title}
              imageLink={`${course.previewImageLink}/cover.webp`}
              description={course.description}
              lessonsCount={course.lessonsCount}
              skills={course.meta.skills}
              rating={course.rating}
              onClickFunction={() => {
                dispatch(setCourseId(course.id));
                navigate(`/courses/course?courseId=${course.id}`);
              }}
            />
          </div>
        ))
      ) : (
        <div style={{ transform: "translateY(40vh)" }}>
          <CircularProgress size={"100px"} />
        </div>
      )}
      {/*<Pagination count={10} color="secondary" showFirstButton showLastButton />*/}
    </Wrapper>
  );
};
