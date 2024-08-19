import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Fetch all quizzes for a course
export const findAllQuizzes = async (cid: string) => {
  try {
    const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes`);
    return data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

// Fetch a single quiz by ID
export const findQuizById = async (cid: string, quizId: string) => {
  try {
    const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes/${quizId}`);
    return data;
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    throw error;
  }
};

// Create a new quiz
export const createQuiz = async (cid: string, quizData: any) => {
  try {
    const { data } = await axios.post(
      `${COURSES_API}/${cid}/quizzes`,
      quizData
    );
    return data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

// Update a quiz
export const updateQuiz = async (
  cid: string,
  quizId: string,
  quizData: any
) => {
  try {
    const { data } = await axios.put(
      `${COURSES_API}/${cid}/quizzes/${quizId}`,
      quizData
    );
    return data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

// Delete a quiz
export const deleteQuiz = async (cid: string, quizId: string) => {
  try {
    const { data } = await axios.delete(
      `${COURSES_API}/${cid}/quizzes/${quizId}`
    );
    return data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

// Record student answers
export const recordStudentAnswers = async (
  cid: string,
  quizId: string,
  answers: any
) => {
  try {
    const studentId =
      /* retrieve student ID from session or context */ "your-student-id-here"; // Replace with actual student ID retrieval
    const { data } = await axios.post(
      `${COURSES_API}/${cid}/quizzes/${quizId}/answers`,
      { studentId, answers }
    );
    return data;
  } catch (error) {
    console.error("Error recording student answers:", error);
    throw error;
  }
};

// Fetch quiz submissions (for faculty to view student results)
export const fetchQuizSubmissions = async (cid: string, quizId: string) => {
  try {
    const { data } = await axios.get(
      `${COURSES_API}/${cid}/quizzes/${quizId}/submissions`
    );
    return data;
  } catch (error) {
    console.error("Error fetching quiz submissions:", error);
    throw error;
  }
};
