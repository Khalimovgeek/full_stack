import { useEffect, useState } from "react";
import api from "../Api/axios";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("tasks/").then(res => setTasks(res.data));
  }, []);

  const deleteTask = async (id) => {
    await api.delete(`tasks/${id}/`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.user}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
