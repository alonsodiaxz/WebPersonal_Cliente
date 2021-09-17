import React from "react";
import { getCourseDataUdemyApi } from "../../../../API/courses";

export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;

  courses.forEach((course) => {
    getCourseDataUdemyApi(course.idCourse)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        return err;
      });
  });

  return (
    <div>
      <h1> </h1>
    </div>
  );
}
