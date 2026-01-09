import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../Api/profile";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then(profile => {
      if (profile.role === "admin") navigate("/admin");
      else navigate("/user");
    });
  }, []);

  return <p>Loading dashboard...</p>;
}
