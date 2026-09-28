import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth";
import Landing from "./Landing";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { ForgotPassword, ResetPassword } from "./PasswordReset";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import AdminSignUp from "./AdminSignUp";

// Everything under /teachers. Loaded on demand so the login code stays out of the main bundle.
const TeacherApp = () => (
  <AuthProvider>
    <Routes>
      <Route index element={<Landing />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="admin" element={<Admin />} />
      <Route path="admin-sign-up" element={<AdminSignUp />} />
      <Route path="*" element={<Navigate to="/teachers" replace />} />
    </Routes>
  </AuthProvider>
);

export default TeacherApp;
