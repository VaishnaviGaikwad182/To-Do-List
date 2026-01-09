import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  const addTask = () => {
    if (!name) return;

    setTasks([...tasks, { name, desc, date, completed: false }]);
    setName("");
    setDesc("");
    setDate("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setName(tasks[index].name);
    setDesc(tasks[index].desc);
    setDate(tasks[index].date);
    deleteTask(index);
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    (task.name + task.desc).toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  
  return (
    <div className="app">
      <div className="glass">
        <header>
          <h1>📝 To do List</h1>
          <p>
            Sometimes our stop-doing list needs to be bigger than our to-do
            list.
          </p>
        </header>

        {/* Add Task */}
        <div className="add-task-card">
          <input
            placeholder="Task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Task description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={addTask}>+ Add Task</button>
        </div>

        {/* Search */}
        <input
          className="search"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Task Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty">
                    No tasks added yet
                  </td>
                </tr>
              )}
              {filteredTasks.map((task, index) => (
                <tr
                  key={index}
                  className={task.completed ? "completed-row" : ""}
                >
                  <td>{task.name}</td>
                  <td>{task.desc}</td>
                  <td>{task.date || "-"}</td>
                  <td className="actions">
                    <button className="edit" onClick={() => editTask(index)}>
                      ✏
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteTask(index)}
                    >
                      🗑
                    </button>
                    <button
                      className="done"
                      onClick={() => toggleComplete(index)}
                    >
                      ✔
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Completed Tasks</span>
            <strong>{completedCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
