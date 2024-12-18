import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";

type Todo = { task: string; done: boolean };

const App = () => {
  const [todo, setTodo] = useState<Todo[]>([]); // Array of tasks with done state
  const [task, setTask] = useState(""); // Input value for the new task
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all"); // Set default filter to 'all'

  // Save new todo
  const saveTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    if (task.trim() === "") return; // Do nothing if the task is empty

    const updatedTodos = [...todo, { task, done: false }];
    setTodo(updatedTodos); // Append task to the array
    localStorage.setItem("todo", JSON.stringify(updatedTodos)); // Persist in localStorage
    setTask(""); // Clear input
  };

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodo = localStorage.getItem("todo");
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo));
    }
  }, []);

  const deleteTodo = (index: number) => {
  const newTodo = [...todo];
  newTodo.splice(index, 1);
  setTodo(newTodo);
  localStorage.removeItem("todo");
  localStorage.setItem("todo", JSON.stringify(newTodo));
};

  // Toggle the done state of a todo item
  const toggleDone = (index: number) => {
    const newTodo = [...todo];
    newTodo[index].done = !newTodo[index].done;
    setTodo(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo));
  };

  return (
    <>
      <h1 className="font-bold text-center text-3xl mt-20 md:text-4xl lg:text-2xl xl:text-3xl">
        Your ToDo's - Remind yourself daily to complete the tasks
      </h1>
      <div className="container mx-auto w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-blue-200 h-auto mt-36 rounded-md p-4 shadow-md">
        <form
  className="flex flex-col gap-4 md:flex-row md:justify-center"
  onSubmit={saveTodo}
>
  <input
    type="text"
    name="name"
    placeholder="Your Todo tasks"
    className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
    value={task}
    onChange={(e) => setTask(e.target.value)}
  />
  <button
    type="submit"
    className="w-full md:w-1/4 lg:w-1/5 xl:w-1/6 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
    disabled={task.trim() === ""}
  >
    Add Task
  </button>
</form>

       <div className="flex justify-center gap-4 mt-4">
  <button
    className={`p-2 rounded-md text-blue-500 ${
      filter === "all" ? "border-b-2 border-blue-700 text-blue-500" : ""
    }`}
    onClick={() => setFilter("all")}
  >
    All
  </button>
  <button
    className={`p-2 rounded-md text-blue-500  ${
      filter === "pending" ? "border-b-2 border-blue-700 text-blue-500" : ""
    }`}
    onClick={() => setFilter("pending")}
  >
    Pending
  </button>
  <button
    className={`p-2 rounded-md text-blue-500  ${
      filter === "done" ? "border-b-2 border-blue-700 text-blue-500" : ""
    }`}
    onClick={() => setFilter("done")}
  >
    Done
  </button>
</div>

        {/* Todo List */}
        <div className="mt-4">
          {todo
            .filter(
              (t) =>
                filter === "all" ||
                (filter === "pending" && !t.done) ||
                (filter === "done" && t.done)
            )
            .map((t, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 p-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(index)}
                />
                <span className={t.done ? "line-through text-gray-500" : ""}>
                  {t.task}
                </span>
                <button
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                  onClick={() => deleteTodo(index)}
                >
                  <AiTwotoneDelete />
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
