import React, { useState, useEffect } from "react";
import api from "./api";
import "./App.css";
import back from "./assets/back.svg";
import small_logo from "./assets/small_logo.svg";
import medium_logo from "./assets/medium_logo.svg";
import profile from "./assets/profile.svg";
import del from "./assets/delete.png";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    category: "",
    description: "",
    is_priority: false,
    date: "",
  });

  const fetchTodos = async () => {
    const response = await api.get("/todos/");
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.value === "checkbox"
        ? event.targe.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/todos/", formData);
    fetchTodos();
    setFormData({
      titulo: "",
      category: "",
      description: "",
      is_priority: false,
      date: "",
    });
  };
  const handleDelete = async (todoId) => {
    console.log(todoId);
  
    try {
      const response = await fetch(`http://localhost:8000/todos/${todoId}`, {
        method: 'DELETE',
      });      
      if (response.ok) {
        console.log("Todo deleted successfully");
        setTodos(todos.filter(todo => todo.id !== todoId));
      } else {
        console.error("Failed to delete the todo. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  
  
  return (
    <div className="bg-[#1E1E26] max-md:bg-[#16161C] pb-10">
      <div className="max-w-[1250px] m-auto">
        <div className="flex items-center justify-between	m-auto">
          <div className="flex m-4 cursor-pointer">
            <img src={back} alt="back" className="mx-4 cursor-pointer"></img>
            <button className="text-[white]">Sair</button>
          </div>
          <img src={small_logo} alt="logo" className="mr-8"></img>
        </div>
        <div className="flex justify-between mb-20 max-md:flex-col max-md:items-center min-h-[450px]">
          <div className="w-1/3 ml-10 flex flex-col justify-between max-md:w-5/6 max-md:justify-start ">
            <div className="mt-10 ">
              <img
                src={profile}
                alt="profile"
                className="max-w-[100px] max-md:hidden"
              ></img>
              <p className="text-[#F9F9F9] text-2xl font-semibold	mt-2 ">
                Olá, Lucas Melo!
              </p>
            </div>

            {/*lembrar de colocar o nome do user */}
            <div className="flex mt-20 items-center max-md:hidden">
              <img src={medium_logo} alt="logo" className="m-4"></img>
              <div>
                <p className="text-[#F9F9F9] text-lg">do it!</p>
                <p className="text-[#F9F9F9] text-sm	">
                  seu to do app favorito :)
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#16161C] w-2/3 max-md:w-5/6">
            <div className="flex justify-between mt-3 m-auto w-full  text-white text-[22px] font-semibold">
              <p className="ml-6 max-md:font-light	max-md:uppercase">Minhas tasks</p>
              <div
                className="flex items-center justify-center rounded-full w-[40px] h-[40px] mr-6 max-md:hidden"
                style={{
                  background:
                    "linear-gradient(225deg, #F29682, #EE69AC , #CB4BCF)",
                }}
              >
                <p className="text-white text-2xl	font-normal	">+</p>
              </div>
            </div>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id} className="todo-item mt-2">
                  <div className="flex justify-between items-center todo-container p-4 bg-[#1A1A1D] rounded-lg mb-3 mx-4">
                    <div className="flex flex-col	">
                      <div className="">
                        <p className="text-[#EE69AC] font-bold">
                          {todo.titulo}
                        </p>
                      </div>
                      {/* <div>
                      <p className="text-white">{todo.category}</p>
                    </div> */}
                      <div>
                        <p className="text-white">{todo.description}</p>
                      </div>

                      {/* <div>
                      <p className="text-white">
                        {todo.is_priority ? "Income" : "Expense"}
                      </p>
                    </div>
                    <div>
                      <p className="text-white">{todo.date}</p>
                    </div> */}
                    </div>
                    <img
                      className="h-[24px] w-[24] cursor-pointer"
                      src={del}
                      alt="delete"
                      onClick={() => handleDelete(todo.id)} 
                    ></img>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-10">
              <div
                className="flex items-center justify-center rounded-full w-[40px] h-[40px] mr-6 md:hidden"
                style={{
                  background:
                    "linear-gradient(225deg, #F29682, #EE69AC , #CB4BCF)",
                }}
              >
                <p className="text-white text-2xl	font-normal	">+</p>
              </div>
            </div>
          </div>
        </div>
        
        <div
          style={{
            background: "#16161C",
            width: "80%",
            margin: "400px auto",
            borderRadius: "10px",
            padding: "25px",
            color: "white",

          }}
        >
          <p
            className="navbar-brand"
            style={{ color: "#EE69AC", fontSize: "26px" }}
          >
            Criar tarefa
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="m-3" style={{}}>
              <p>Título</p>
              <input
                type="text"
                required
                className="form-control"
                name="titulo"
                placeholder="Insira o título da tarefa"
                value={formData.titulo}
                onChange={handleInputChange}
                style={{
                  background: "#1E1E26",
                  color: "white",
                  border: "none",
                }}
              />
            </div>
            <div className="m-3">
              <p>Categoria</p>
              <input
                type="text"
                className="form-control"
                name="category"
                placeholder="Insira a categoria da tarefa"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  background: "#1E1E26",
                  color: "white",
                  border: "none",
                }}
              />
            </div>
            <div className="m-3">
              <p>Descrição</p>
              <textarea
                type="text"
                rows="4"
                required
                className="form-control"
                name="description"
                placeholder="Insira a descrição da tarefa"
                value={formData.description}
                onChange={handleInputChange}
                style={{
                  background: "#1E1E26",
                  border: "none",
                  color: "white",
                }}
              />
            </div>
            <div
              className="m-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <p style={{ margin: "5px" }}>Prioridade?</p>
              <input
                type="checkbox"
                className=""
                name="is_priority"
                value={formData.is_priority}
                onChange={handleInputChange}
              />
            </div>
            <div className="m-3">
              <p style={{ margin: "5px" }}>Prazo</p>
              <input
                type="text"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={{
                  background: "#1E1E26",
                  color: "white",
                  border: "none",
                }}
              />
            </div>
            <div
              className="m-3"
              style={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                style={{
                  color: "white",
                  padding: "10px 100px",
                  border: "none",
                  borderRadius: "5px",
                  background:
                    "linear-gradient(225deg, #F29682, #EE69AC , #CB4BCF)",
                  fontWeight: "400",
                }}
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
        

        {/* <table
              className="table table-striped table-bordered table-hover max-w-[600px]"
              style={{ margin: "20px auto" }}
            >
              <thead className="text-[white]">
                <th>titulo</th>
                <th>Category</th>
                <th>Description</th>
                <th>Prioridade?</th>
                <th>Date</th>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.titulo}</td>
                    <td>{todo.category}</td>
                    <td>{todo.description}</td>
                    <td>{todo.is_priority ? "Yes" : "No"}</td>
                    <td>{todo.date}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
      </div>
    </div>
    
  );
};

export default App;
