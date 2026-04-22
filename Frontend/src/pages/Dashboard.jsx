import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async () => {
    if (!title) return;

    try {
      await createTask({ title }, token);
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">

        {user?.role === "admin" && (
          <h3 className="text-green-600 mb-2 font-semibold">
            👑 Admin Panel
          </h3>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 border rounded-lg"
            placeholder="Enter task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div>
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks yet</p>
          )}

          {tasks.map((t) => (
            <div
              key={t._id}
              className="p-3 mb-2 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{t.title}</p>

                {user?.role === "admin" && t.user?.email && (
                  <p className="text-xs text-gray-500">
                    {t.user.email}
                  </p>
                )}
              </div>

              <button
                onClick={() => removeTask(t._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}