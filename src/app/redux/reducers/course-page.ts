import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICoursePageState,
  ISetCourseProgress,
  ISetLessonProgress,
} from "./models";

const initialState = { coursesProgress: {} } as ICoursePageState;

export const coursePageSlice = createSlice({
  name: "coursePage",
  initialState,
  reducers: {
    setCourseProgress(state, action: PayloadAction<ISetCourseProgress>) {
      state.coursesProgress[action.payload.courseId] =
        action.payload.courseProgress;
    },
    setLessonProgress(state, action: PayloadAction<ISetLessonProgress>) {
      state.coursesProgress[action.payload.courseId][action.payload.lessonId] =
        action.payload.lessonProgressTime;
    },
  },
});
