import React from "react";
import LogIn from "./Pages/LogIn";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SingUp from "./Pages/SingUp";
import SuccessRegister from "./Pages/SuccessRegister";
import Verify from "./Pages/Verify";
import {
  ProtectedRoutesQuestions,
  ProtectedRoutesLog,
  ProtectedRoutesSingUp,
} from "./components/ProtectedRoutes";
import PageThanks from "./Pages/PageThanks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/success" element={<SuccessRegister />} />
        <Route element={<ProtectedRoutesQuestions />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<ProtectedRoutesLog />}>
          <Route path="/logIn" element={<LogIn />} />
        </Route>
        <Route element={<ProtectedRoutesSingUp />}>
          <Route path="/singUp" element={<SingUp />} />
        </Route>
        <Route path="/close" element={<PageThanks />} />
        <Route path="/email/verify/:id/:hash" element={<Verify />} />
      </Routes>
    </div>
  );
}

export default App;
