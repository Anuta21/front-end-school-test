import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { CoursesListPage, CoursePage, ErrorPage } from "./pages";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/courses/"} />} />
        <Route path="/courses/" element={<CoursesListPage />} />
        <Route path="/courses/course/" element={<CoursePage />} />
        <Route path="/error/" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
