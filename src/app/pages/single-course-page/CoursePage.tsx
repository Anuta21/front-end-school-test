import { AxiosError } from "axios";
import Hls from "hls.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  coursePageSlice,
  coursesListPageSlice,
  useAppSelector,
} from "../../redux";
import { Client, IGetCourse } from "../../services";
import { authErrorResponse } from "../../services/controllers/constants";
import { Title, Wrapper, Description, BackButton } from "./styles";
import { LessonCardComponent } from "../../components/lesson-card";
import { CircularProgress } from "@mui/material";
import { unlockedStatus } from "../../components/lesson-card/constants";

export const CoursePage: React.FC = () => {
  const { token, courseId } = useAppSelector(
    (state) => state.persistedReducer.coursesListPage
  );
  const { coursesProgress } = useAppSelector(
    (state) => state.persistedReducer.coursePage
  );
  const { setToken } = coursesListPageSlice.actions;
  const { setCourseProgress, setLessonProgress } = coursePageSlice.actions;
  const dispatch = useDispatch();

  const client = new Client();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({} as IGetCourse);

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

      async function getCourse(token: string) {
        try {
          const responseData = (await client.courses.getCourse(courseId, token))
            .data;
          const lessons = responseData.lessons.sort(
            (a, b) => a.order - b.order
          );
          responseData.lessons = lessons.slice();
          console.log(responseData);
          setCourseData(responseData);
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              return authErrorResponse;
            } else {
              navigate("/error/");
            }
          }
        }
      }

      const response = await getCourse(token);
      if (response === authErrorResponse) {
        const newToken = await getToken();
        await getCourse(newToken);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (courseData.lessons) {
      if (!coursesProgress[courseId]) {
        const unlockedLessons = courseData.lessons.filter(
          (lesson) => lesson.status === unlockedStatus
        );
        const courseProgress = unlockedLessons.reduce(
          (arr, lesson) => ({ ...arr, [lesson.id]: 0 }),
          { preview: 0 }
        );
        dispatch(setCourseProgress({ courseId, courseProgress }));
      }
    }

    var video = document.getElementById("previewVideo");
    if (Hls.isSupported() && video instanceof HTMLMediaElement) {
      console.log(coursesProgress);
      var hls = new Hls();
      hls.loadSource(courseData.meta.courseVideoPreview.link);
      hls.attachMedia(video);
      video.currentTime = coursesProgress[courseId]
        ? coursesProgress[courseId]["preview"]
        : 0;

      video.addEventListener("timeupdate", function () {
        dispatch(
          setLessonProgress({
            courseId,
            lessonId: "preview",
            lessonProgressTime: this.currentTime,
          })
        );
      });
    }
  }, [courseData]);

  return (
    <>
      {Object.keys(courseData).length !== 0 ? (
        <>
          <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
          <Wrapper>
            <Title>{courseData.title}</Title>
            {courseData.meta.courseVideoPreview ? (
              <video
                id="previewVideo"
                width="400px"
                poster={`${courseData.meta.courseVideoPreview.previewImageLink}/preview.webp`}
                controls
              />
            ) : (
              <div />
            )}

            <Description>{courseData.description}</Description>
            <div style={{ margin: "20px 0px 20px 0px" }}>
              <>Lessons Number: {courseData.lessons.length}</>
              <div style={{ marginBottom: "20px" }}>
                Rating: {courseData.rating}
              </div>
              {courseData.meta.skills ? (
                <>
                  Skills:
                  {courseData.meta.skills.map((skill, id) => (
                    <li key={id}>{skill}</li>
                  ))}{" "}
                </>
              ) : (
                <>No skills</>
              )}
            </div>
          </Wrapper>

          <div>
            {courseData.lessons.map((lesson) => (
              <LessonCardComponent
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                status={lesson.status}
                link={lesson.link}
                order={lesson.order}
                previewImageLink={lesson.previewImageLink}
              />
            ))}
          </div>
        </>
      ) : (
        <Wrapper>
          <div style={{ transform: "translateY(40vh)" }}>
            <CircularProgress size="100px" />
          </div>
        </Wrapper>
      )}
    </>
  );
};
