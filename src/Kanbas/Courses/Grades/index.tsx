import { LiaFileImportSolid } from "react-icons/lia";
import { FaFileImport } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { useParams } from "react-router";
import * as db from "../../Database";
import { User, Assignment, Grade, Enrollment } from "../../Database/types";

export default function Grades() {
  const { cid } = useParams<string>();

  if (!cid) return <div>Course not found</div>;

  const studentsInCourse: User[] = db.enrollments
    .filter((enrollment: Enrollment) => enrollment.course === cid)
    .map((enrollment: Enrollment) => db.users.find((user: User) => user._id === enrollment.user))
    .filter((user: User | undefined): user is User => user !== undefined);

  const assignmentsInCourse: Assignment[] = db.assignments
    .filter((assignment: Assignment) => assignment.course === cid);

  const gradesInCourse: Grade[] = db.grades
    .filter((grade: Grade) => studentsInCourse.some((student: User) => student._id === grade.student));

  return (
    <div id="wd-grades-controls-container" className="container mt-4">
      <div className="row mb-3">
        <div className="col text-end">
          <button id="wd-add-grades-btn" className="btn btn-lg btn-secondary me-1 float-end">
            <IoIosSettings className="position-relative me-2" style={{ bottom: "1px", fontSize: "1.5em" }} />
          </button>
          <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 dropdown-toggle float-end">
            <LiaFileImportSolid className="position-relative me-2" style={{ bottom: "1px" }} />
            Export
          </button>
          <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
            <FaFileImport className="position-relative me-2" style={{ bottom: "1px" }} />
            Import
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label"><b>Student Names</b></label>
        </div>
        <div className="col">
          <label className="form-label"><b>Assignment Names</b></label>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                id="wd-search-student"
                className="form-control search-input"
                placeholder="Search Students..."
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                id="wd-search-assignments"
                className="form-control search-input"
                placeholder="Search Assignments..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <button id="wd-add-filters-btn" className="btn btn-lg btn-secondary me-1">
            <CiFilter className="position-relative me-2" style={{ bottom: "1px", fontSize: "1.5em" }} />
            Apply Filters
          </button>
        </div>
      </div>

      <div id="wd-css-responsive-tables" className="table-responsive">
        <table className="table table-striped border-grey table-bordered">
          <thead>
            <tr>
              <th>Student Name</th>
              {assignmentsInCourse.map((assignment) => (
                <th key={assignment._id}>
                  {assignment.title} <br /> Out of 100
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentsInCourse.map((student) => (
              <tr key={student._id}>
                <td>{student.firstName} {student.lastName}</td>
                {assignmentsInCourse.map((assignment) => {
                  const grade = gradesInCourse.find(
                    (grade) => grade.student === student._id && grade.assignment === assignment._id
                  );
                  return (
                    <td key={assignment._id}>
                      {grade ? `${grade.grade}%` : "N/A"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}