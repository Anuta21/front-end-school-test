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
import {
  Details,
  Lessons,
  PreviewVideo,
  Title,
  Wrapper,
  Description,
} from "./styles";
import { LessonCardComponent } from "../../components/lesson-card";

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
          console.log(responseData);
          setCourseData(responseData);
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              return authErrorResponse;
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
          (lesson) => lesson.status === "unlocked"
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

  useEffect(() => {}, []);

  return (
    <>
      {Object.keys(courseData).length !== 0 ? (
        <>
          <Wrapper>
            <Title>{courseData.title}</Title>
            <PreviewVideo>
              <video
                id="previewVideo"
                width="400px"
                poster={`${courseData.meta.courseVideoPreview.previewImageLink}/preview.webp`}
                controls
              ></video>
            </PreviewVideo>
            <Description>{courseData.description}</Description>
            <div style={{ margin: "20px 0px 20px 0px" }}>
              <>Lessons Number: {courseData.lessons.length}</>
              <div style={{ marginBottom: "20px" }}>
                Rating: {courseData.rating}
              </div>
              Skills:
              {courseData.meta.skills ? (
                courseData.meta.skills.map((skill) => <li>{skill}</li>)
              ) : (
                <div />
              )}
            </div>
          </Wrapper>
          <Lessons>
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
          </Lessons>
        </>
      ) : (
        <div />
      )}
    </>
  );
};