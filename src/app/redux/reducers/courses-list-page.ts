import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoursesListPageState } from "./models";

const initialState = {
  token: "",
  courseId: "",
} as ICoursesListPageState;

export const coursesListPageSlice = createSlice({
  name: "coursesListPage",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setCourseId(state, action: PayloadAction<string>) {
      state.courseId = action.payload;
    },
  },
});
