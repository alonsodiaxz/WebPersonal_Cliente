import React from "react";
import MainBanner from "../components/Web/MainBanner/MainBanner";
import HomeCourses from "../components/Web/HomeCourses/HomeCourses";
import HowMyCoursesWork from "../components/Web/HowMyCoursesWork/HowMyCoursesWork";
import ReviewsCourses from "../components/Web/ReviewsCourses/ReviewsCourses";

export default function Home() {
  return (
    <>
      <MainBanner />
      <HomeCourses />
      <HowMyCoursesWork />
      <ReviewsCourses />
    </>
  );
}
