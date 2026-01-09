import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);   // ✅ MUST be array
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("access"); // or wherever you store it

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/tasks/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // ✅ Your API already returns an array
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "10px" }}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Status: {task.completed ? "✅ Done" : "⏳ Pending"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
