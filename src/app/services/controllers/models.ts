export interface ICourseVideoPreview {
  link: string;
  previewImageLink: string;
}

export interface IMeta {
  skills: Array<string>;
  courseVideoPreview: ICourseVideoPreview;
}

export interface ICourse {
  id: string;
  description: string;
  lessonsCount: number;
  rating: number;
  title: string;
  previewImageLink: string;
  meta: IMeta;
}

export interface IGetCoursesResponse {
  courses: Array<ICourse>;
}

export interface ILesson {
  id: string;
  link: string;
  order: number;
  previewImageLink: string;
  status: string;
  title: string;
}

export interface IGetCourse extends ICourse {
  lessons: Array<ILesson>;
  meta: IMeta;
}
