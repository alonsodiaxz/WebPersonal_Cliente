import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../API/auth";
import { getCourses } from "../../API/courses";
import CoursesList from "../../components/Admin/Courses/CoursesList/CoursesList";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    getCourses(token)
      .then((response) => {
        setCourses(response.courses);
        setReloadCourses(false);
        console.log(response.courses);
      })
      .catch((err) => {
        return err;
      });
  }, [reloadCourses]);

  return (
    <div className="courses">
      <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
    </div>
  );
}
