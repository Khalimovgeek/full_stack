
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Web/login";
import SignUpPage from "./Web/signup";
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;