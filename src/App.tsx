import "./App.css";
import { useTheme } from "@itwin/itwinui-react";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";
import { ProvideAuth } from "./services/useAuth";
import Header from "./components/Header/Header";

function App() {
  useTheme("dark", { highContrast: true });

  return (
    <div className="App">
      <Header />
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
