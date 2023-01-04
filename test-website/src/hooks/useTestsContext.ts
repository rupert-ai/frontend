import React from "react";

export type Run = {
  files: File[];
};

type TestsContextProps = {
  runs: Run[];
  setRuns: (runs: Run[] | ((prevState: Run[]) => Run[])) => void;
};

export const TestsContext = React.createContext<TestsContextProps | undefined>(
  undefined
);

export const useTestsContext = () => {
  return React.useContext(TestsContext) || ({} as TestsContextProps);
};
