import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../src/layout/layout";
import Users from "../src/pages/Users"
import Courses from "../src/pages/Courses"
import Task from "../src/pages/Task"
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
            path="/tasks"
            element={
              <Layout>
                <Task />
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