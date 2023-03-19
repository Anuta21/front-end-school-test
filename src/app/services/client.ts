import { CoursesController } from "./controllers";
import { AuthController } from "./controllers/auth-controller";

export class Client {
  public readonly courses: CoursesController;
  public readonly auth: AuthController;

  constructor() {
    this.courses = new CoursesController();
    this.auth = new AuthController();
  }
}
