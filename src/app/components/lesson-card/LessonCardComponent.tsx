import Hls from "hls.js";
import React, { useEffect, useRef, useState } from "react";
import { unlockedStatus } from "./constants";
import { ILessonCardProps } from "./models";
import { Title, Content } from "./styles";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { coursePageSlice, useAppSelector } from "../../redux";

export const LessonCardComponent: React.FC<ILessonCardProps> = ({
  id,
  link,
  order,
  previewImageLink,
  status,
  title,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [downloadVideo, setDownloadVideo] = useState(false);

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
        hls.loadSource(link);
        hls.attachMedia(video);
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
        <div
          style={{ marginLeft: "20px" }}
          onClick={() => {
            if (status === unlockedStatus) {
              setShowVideo(!showVideo);
              setDownloadVideo(true);
            }
          }}
        >
          Lesson {order} - {title}
        </div>
        <LockOutlined
          style={{
            opacity: status === unlockedStatus ? "0" : "1",
            marginLeft: "10px",
          }}
        />
      </Title>

      <Content style={{ height: showVideo ? "320px" : "0px" }}>
        {status === "unlocked" ? (
          <video
            style={{
              height: showVideo ? "300px" : "0px",
              position: "absolute",
            }}
            id={`video-${order}`}
            width="600px"
            poster={`${previewImageLink}/lesson-${order}.webp`}
            controls
          ></video>
        ) : (
          <div />
        )}
      </Content>
    </>
  );
};
