import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../src/layout/layout";
import Users from "../src/pages/Users"
import Courses from "../src/pages/Courses"
import Career from "../src/pages/Career"
import AcademicCycle from "../src/pages/AcademicCycle"
import Material from "../src/pages/Material"
import Enrollment from "../src/pages/Enrollment"
import AssignmentDelivery from "../src/pages/AssignmentDelivery"

function App() {
  return (
      <>
        <Routes>
          <Route
            path="/users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <Courses />
              </Layout>
            }
          />
          <Route
            path="/careers"
            element={
              <Layout>
                <Career />
              </Layout>
            }
          />
          <Route
            path="/enrollments"
            element={
              <Layout>
                <Enrollment />
              </Layout>
            }
          />
          <Route
            path="/academic-cycles"
            element={
              <Layout>
                <AcademicCycle />
              </Layout>
            }
          />
          <Route
            path="/materials"
            element={
              <Layout>
                <Material />
              </Layout>
            }
          />
          <Route
            path="/assignment-delivery"
            element={
              <Layout>
                <AssignmentDelivery />
              </Layout>
            }
          />
        </Routes>
      </>
  );
}

export default App;