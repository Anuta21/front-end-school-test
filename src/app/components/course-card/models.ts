export interface ICourseCardProps {
  id: string;
  title: string;
  imageLink: string;
  description: string;
  lessonsCount: number;
  skills: Array<string>;
  rating: number;
  onClickFunction: (courseId: string) => void;
}
