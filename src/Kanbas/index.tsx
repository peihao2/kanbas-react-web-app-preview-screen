import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import store, { RootState } from "./store";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import * as client from "./Courses/client";
import "./styles.css";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import { Provider } from "react-redux";

function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([...courses,  newCourse ]);
  };

  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => (c._id === course._id ? course : c))
    );
  };

  // Use `useSelector` to get the `userRole` from the Redux store
  const userRole = useSelector((state: RootState) => state.accountReducer.userRole);

  return (
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="Dashboard" element={
            <ProtectedRoute><Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
            />
            </ProtectedRoute>
          } />

          <Route path="Courses/:cid/*" element={
          <ProtectedRoute><Courses 
              courses={courses} userRole={userRole} 
            /></ProtectedRoute>} />   

          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}

function RootComponent() {
  return (
    <Provider store={store}>
      <Kanbas />
    </Provider>
  );
}

export default RootComponent;
