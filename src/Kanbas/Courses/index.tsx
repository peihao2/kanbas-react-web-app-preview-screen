///Users/phoebelin/2024/summer/webdev/kanbas-react-web-app/src/Kanbas/Courses/index.tsx
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Piazza from "./Piazza";
import Zoom from "./Zoom";

// add new import for quizzes
import React from "react";
import QuizListScreen from "./Quizzes/QuizzesList";
import QuizDetailsScreen from "./Quizzes/QuizDetails";
import QuizEditorScreen from "./Quizzes/QuizEditor";
import QuizPreviewScreen from "./Quizzes/QuizPreview";
import StartQuizScreen from "./Quizzes/StartQuiz";

import Grades from "./Grades";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import {
  Navigate,
  Route,
  Routes,
  useParams,
  useLocation,
  useNavigate,
} from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import PeopleDetails from "./People/Details";
import StartQuiz from "./Quizzes/StartQuiz";

// userRole is passed down to the component when defining the routes
export default function Courses({
  courses,
  userRole,
}: {
  courses: any[];
  userRole: any;
}) {
  const { cid } = useParams<{ cid: string }>();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  const fetchUsers = async () => {};

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:id" element={<AssignmentEditor />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Zoom" element={<Zoom />} />
            <Route path="Piazza" element={<Piazza />} />
            // add new path for quizzes
            <Route
              path="Quizzes"
              element={<QuizListScreen userRole={userRole} />}
            />
            <Route
              path="Quizzes/:quizId/Edit"
              element={<QuizEditorScreen userRole={userRole} />}
            />
            <Route
              path="Quizzes/:quizId/Detail"
              element={<QuizDetailsScreen userRole={userRole} />}
            />
            <Route
              path="Quizzes/:quizId/Preview"
              element={<QuizPreviewScreen userRole={userRole} />}
            />
            <Route
              path="Quizzes/:quizId/StartQuiz"
              element={<StartQuizScreen userRole={userRole} />}
            />
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
            <Route
              path="People/Details/:uid"
              element={<PeopleDetailsWrapper fetchUsers={fetchUsers} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function PeopleDetailsWrapper({ fetchUsers }: { fetchUsers: () => void }) {
  const { uid, cid } = useParams<{ uid: string; cid: string }>();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(`/Kanbas/Courses/${cid}/People`);
  };

  if (!uid) {
    return <div>Error: No user selected.</div>;
  }

  return (
    <PeopleDetails
      selectedUserId={uid}
      fetchUsers={fetchUsers}
      onClose={onClose}
    />
  );
}
