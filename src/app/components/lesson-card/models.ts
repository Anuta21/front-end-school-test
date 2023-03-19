import { ILesson } from "../../services";

export interface ILessonCardProps extends ILesson {}

export interface ITitleProps {
  unlocked: boolean;
}

export interface IContent {
  show: boolean;
}
