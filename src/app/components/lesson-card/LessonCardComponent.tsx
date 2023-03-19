import Hls from "hls.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { unlockedStatus } from "./constants";
import { ILesson } from "../../services";
import { Title, Content, Video, TitleText } from "./styles";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { coursePageSlice, useAppSelector } from "../../redux";
import { Colors } from "../../common/assets";

export const LessonCardComponent: React.FC<ILesson> = ({
  id,
  link,
  order,
  previewImageLink,
  status,
  title,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [downloadVideo, setDownloadVideo] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseId } = useAppSelector(
    (state) => state.persistedReducer.coursesListPage
  );
  const { coursesProgress } = useAppSelector(
    (state) => state.persistedReducer.coursePage
  );
  const { setLessonProgress } = coursePageSlice.actions;

  useEffect(() => {
    if (showVideo) {
      var video = document.getElementById(`video-${order}`);
      if (Hls.isSupported() && video instanceof HTMLMediaElement) {
        var hls = new Hls();

        try {
          hls.loadSource(link);
          hls.attachMedia(video);
          hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              setShowErrorMessage(true);
            }
          });
        } catch {
          navigate("/error/");
        }

        video.currentTime = coursesProgress[courseId]
          ? coursesProgress[courseId][id]
          : 0;

        video.addEventListener("timeupdate", function () {
          dispatch(
            setLessonProgress({
              courseId,
              lessonId: id,
              lessonProgressTime: this.currentTime,
            })
          );
        });
      }
    }
  }, [downloadVideo]);

  return (
    <>
      <Title unlocked={status === unlockedStatus}>
        <TitleText
          onClick={() => {
            if (status === unlockedStatus) {
              setShowVideo(!showVideo);
              setDownloadVideo(true);
            }
          }}
        >
          Lesson {order} - {title}
        </TitleText>
        <LockOutlined
          style={{
            opacity: status === unlockedStatus ? "0" : "1",
            marginLeft: "10px",
          }}
        />
      </Title>

      <Content show={showVideo}>
        {status === unlockedStatus ? (
          <>
            <Video
              show={showVideo}
              id={`video-${order}`}
              poster={`${previewImageLink}/lesson-${order}.webp`}
              controls
            ></Video>
            <div
              style={{
                color: Colors.Red,
                opacity: showErrorMessage ? "1" : "0",
              }}
            >
              Failed to load media content
            </div>
          </>
        ) : (
          <div />
        )}
      </Content>
    </>
  );
};
