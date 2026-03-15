import { Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "../src/pages/Register/RegisterPage.jsx";
import LoginPage from "../src/pages/Login/Loginpage.jsx";
import HomePage from "../src/pages/HomePage/HomePage.jsx";
import MyLibrary from "../src/pages/MyLibrary/MyLibrary.jsx";

import ProtectedRoute from "../src/components/ProtectedRoute.jsx";
import PublicRoute from "../src/components/PublicRoute.jsx";

import MainLayout from "../src/layouts/MainLayout.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        {/* PUBLIC */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* PROTECTED + LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;