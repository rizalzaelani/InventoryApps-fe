import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import "./style.css";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
