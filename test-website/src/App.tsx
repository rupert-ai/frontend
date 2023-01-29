import { Content } from "carbon-components-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import AppHeader from "./components/AppHeader";
import { Run, TestsContext } from "./hooks/useTestsContext";

function App() {
  const [runs, setRuns] = useState<Run[]>([]);
  return (
    <>
      <TestsContext.Provider value={{ runs, setRuns }}>
        <AppHeader />
        <Content
          style={{
            overflow: "auto",
            display: "flex",
            width: "100%",
            marginLeft: "16rem"
          }}
        >
          <Outlet />
        </Content>
      </TestsContext.Provider>
    </>
  );
}

export default App;
