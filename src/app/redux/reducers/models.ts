export interface ICourseProgress {
  [key: string]: number;
}

export interface ICoursesProgress {
  [key: string]: ICourseProgress;
}

export interface ICoursesListPageState {
  token: string;
  courseId: string;
}

export interface ICoursePageState {
  coursesProgress: ICoursesProgress;
}

export interface ISetCourseProgress {
  courseId: string;
  courseProgress: ICourseProgress;
}

export interface ISetLessonProgress {
  courseId: string;
  lessonId: string;
  lessonProgressTime: number;
}
