import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Web/login";
import SignUpPage from "./Web/signup";
import Home from "./Web/home";
import UserDashboard from "./Web/UserDashboard";
import AdminDashboard from "./Web/AdminDashboard";
import ProtectedRoute from "./security/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/home" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />

        <Route path="/user" element={
          <ProtectedRoute><UserDashboard /></ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
