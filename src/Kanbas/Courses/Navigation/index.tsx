import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "./index.css";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `#/Kanbas/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);
        return (
          <a
            key={link}
            id={`wd-course-${link.toLowerCase()}-link`}
            href={path}
            className={`list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`}
          >
            {link}
          </a>
        );
      })}
    </div>
  );
}
