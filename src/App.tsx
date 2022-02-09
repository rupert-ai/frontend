import "./App.css";
import { useTheme } from "@itwin/itwinui-react";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";
import { ProvideAuth } from "./services/useAuth";

function App() {
  useTheme("dark");

  return (
    <div className="App">
      <ProvideAuth>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ProvideAuth>
    </div>
  );
}

export default App;
