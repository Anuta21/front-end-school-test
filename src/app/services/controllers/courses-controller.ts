import { RequestBuilder } from "../../common";
import { IGetCourse, IGetCoursesResponse } from "./models";

export class CoursesController {
  private searchUrl = `https://api.wisey.app/api/v1/core/preview-courses`;

  getCourses(token: string) {
    const path = `${this.searchUrl}`;
    return new RequestBuilder()
      .setHeaders({
        Authorization: `Bearer ${token}`,
      })
      .get<IGetCoursesResponse>(path);
  }

  getCourse(courseId: string, token: string) {
    const path = `${this.searchUrl}/${courseId}`;
    return new RequestBuilder()
      .setHeaders({
        Authorization: `Bearer ${token}`,
      })
      .get<IGetCourse>(path);
  }
}
