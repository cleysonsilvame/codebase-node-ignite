interface Course {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {
  execute({ name, duration = 10, educator }: Course) {
    console.log(
      "🚀 ~ file: CreateCourseService.ts ~ line 3 ~ CreateCourseService ~ execute ~ name: string, duration: number, educator: string",
      name,
      duration,
      educator
    );
  }
}

export default new CreateCourseService();
