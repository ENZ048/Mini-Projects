import { useState, useEffect } from "react";

export default function LocalTasker() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const showPopup = (message, type = "success") => {
    const id = Date.now();
    setPopups((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setPopups((prev) => prev.filter((popup) => popup.id !== id));
    }, 3000);
  };

  const addTask = () => {
    if (task.trim() === "") {
      showPopup("Tasks cannot be empty!", "warning");
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);
    setTask("");
    showPopup("Task Added Successfully!");
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((t) => (t?.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    showPopup("Task Deleted Successfully!");
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
    showPopup("Cleared Completed Tasks!");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center p-5 bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Local Tasker</h1>

      <div className="fixed top-8  md:left-[38%] lg:left-[40%] xl:left-[45%] transform -translate-x-1/2 flex flex-col items-center gap-2">
        <div>
          {popups.map((popup) => (
            <div
              key={popup.id}
              className={`p-3 mb-2 rounded-lg shadow-lg animate-popup-in animate-popup-out ${
                popup.type === "warning"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-500 text-white"
              }`}
            >
              {popup.message}
              <div className="h-1 bg-white mt-2 w-full animate-popup-bar"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex mb-4 w-full max-w-xl ">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none"
        />
        <button
          onClick={addTask}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <ul className="w-full max-w-xl p-4 rounded-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center p-2 bg-gray-300 rounded mb-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleCompleted(t.id)}
                className="cursor-pointer"
              />
              <span
                onClick={() => toggleCompleted(t.id)}
                className={`cursor-pointer ${
                  t.completed ? "line-through" : ""
                }`}
              >
                {t.text}
              </span>
            </div>

            <button
              onClick={() => deleteTask(t.id)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.some((t) => t.completed) && (
        <button
          onClick={clearCompleted}
          className="mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
        >
          Clear Completed Tasks
        </button>
      )}
      
    </div>
  );
}
