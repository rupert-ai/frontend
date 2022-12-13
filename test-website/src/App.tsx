import { Content } from "carbon-components-react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <>
      <AppHeader />
      <Content
        style={{
          overflow: "auto",
          display: "flex",
          width: "calc(100% - 20rem)",
        }}
      >
        <Outlet />
      </Content>
    </>
  );
}

export default App;
