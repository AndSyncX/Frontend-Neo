import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../src/layout/layout";
import Users from "../src/pages/Users"

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
        </Routes>
      </>
  );
}

export default App;