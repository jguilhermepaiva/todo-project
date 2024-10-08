import React, { useState, useEffect } from "react";
import api from "../../api";
import "./Todo.css";
import back from "../../assets/back.svg";
import small_logo from "../../assets/small_logo.svg";
import medium_logo from "../../assets/medium_logo.svg";
import profile from "../../assets/profile.svg";
import del from "../../assets/delete.png";
import highest from "../../assets/highest.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [expandedTodo, setExpandedTodo] = useState(null); 
  const [formData, setFormData] = useState({
    titulo: "",
    category: "",
    description: "",
    is_priority: false,
    date: "",
  });

  const [username, setUsername] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const user = await response.json();
        setUsername(user.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/todos/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.value === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      await axios.post("http://localhost:8000/todos/", formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });

      fetchTodos(); 
      setFormData({
        titulo: "",
        category: "",
        description: "",
        is_priority: false,
        date: "",
      });
      setIsPopupOpen(false); 
    } catch (error) {
      console.error("Erro ao criar a ToDo:", error);
    }
  };

  const handleDelete = async (todoId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      } else {
        console.error("Failed to delete the todo. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleAccordion = (todoId) => {
    setExpandedTodo(expandedTodo === todoId ? null : todoId);
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8000/verify-token/${token}`
        );

        if (!response.ok) {
          throw new Error("Token verification failed");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div className="bg-[#1E1E26] max-md:bg-[#16161C] pb-10 h-[100vh] pt-[8%]">
      <div className="max-w-[1250px] mx-auto ">
        <div className="flex items-center justify-between m-auto">
          <div
            className="flex m-4 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/"); // Redireciona para a página de login
            }}
          >
            <img src={back} alt="back" className="mx-3 cursor-pointer"></img>
            <button className="text-[white]">Sair</button>
          </div>

          <img src={small_logo} alt="logo" className="mr-8"></img>
        </div>
        <div className="flex justify-between mb-20 max-md:flex-col max-md:items-center min-h-[450px]">
          <div className="w-1/3 ml-10 flex flex-col justify-between max-md:w-5/6 max-md:justify-start">
            <div className="mt-10">
              <img
                src={profile}
                alt="profile"
                className="max-w-[100px] max-md:hidden"
              ></img>
              <p className="text-[#F9F9F9] text-2xl font-semibold mt-3">
                Olá, {capitalize(username) || "Usuário"}!
              </p>
            </div>
            <div className="flex mt-20 items-center max-md:hidden">
              <img src={medium_logo} alt="logo" className="m-4"></img>
              <div>
                <p className="text-[#F9F9F9] text-lg">do it!</p>
                <p className="text-[#F9F9F9] text-sm">
                  seu to do app favorito :)
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#16161C] w-2/3 max-md:w-5/6  max-md:h-[50vh] md:mr-10">
            <div className="flex justify-between my-3 m-auto w-full text-white text-[22px] font-semibold">
              <p className="ml-6 max-md:font-light max-md:uppercase">
                Minhas tasks
              </p>
              <div
                className="flex items-center justify-center rounded-full w-[40px] h-[40px] mr-6 max-md:hidden cursor-pointer"
                style={{
                  background:
                    "linear-gradient(225deg, #F29682, #EE69AC , #CB4BCF)",
                }}
                onClick={() => setIsPopupOpen(true)}
              >
                <p className="text-white text-2xl font-normal">+</p>
              </div>
            </div>
            <ul className="md:max-h-[45vh] max-md:max-h-[55vh] overflow-auto">
              {todos
                .sort((a, b) => {
                  if (a.is_priority && b.is_priority) {
                    if (a.date && b.date) {
                      return new Date(a.date) - new Date(b.date); 
                    } else if (a.date) {
                      return -1; 
                    } else if (b.date) {
                      return 1; 
                    }
                    return 0; 
                  } else if (a.is_priority) {
                    return -1; 
                  } else if (b.is_priority) {
                    return 1; 
                  } else if (a.date && b.date) {
                    return new Date(a.date) - new Date(b.date); 
                  } else if (a.date) {
                    return -1; 
                  } else if (b.date) {
                    return 1; 
                  }
                  return 0; 
                })
                .map((todo) => (
                  <li key={todo.id} className="todo-item mt-2">
                    <div
                      className="flex justify-between items-center todo-container p-4 bg-[#1A1A1D] rounded-lg mb-3 mx-4 cursor-pointer"
                      onClick={() => toggleAccordion(todo.id)}
                    >
                      <div className="flex flex-col">
                        <div>
                          <p className="text-[#EE69AC] font-bold">
                            {todo.titulo}
                          </p>
                        </div>
                        <div>
                          <p className="text-white">{todo.description}</p>
                        </div>
                        {expandedTodo === todo.id && ( 
                          <div className="text-white mt-2">
                            <p>{todo.category}</p>
                            <p>
                              {todo.is_priority
                                ? "É prioridade"
                                : "Não é prioridade"}
                            </p>
                            <p>{todo.date}</p>
                          </div>
                        )}
                      </div>
                      <div className="">
                        <img
                          className={`${
                            todo.is_priority
                              ? "h-[24px] w-[24] mt-[-22px] mb-[8px]"
                              : "h-[24px] w-[24] hidden"
                          }`}
                          src={highest}
                          alt="prioridade"
                        ></img>
                        <img
                          className="h-[24px] w-[24] cursor-pointer"
                          src={del}
                          alt="delete"
                          onClick={() => handleDelete(todo.id)}
                        ></img>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            <div className="flex justify-end mt-10">
              <div
                className="flex items-center justify-center rounded-full w-[40px] h-[40px] mr-6 md:hidden cursor-pointer "
                style={{
                  background:
                    "linear-gradient(225deg, #F29682, #EE69AC , #CB4BCF)",
                }}
                onClick={() => setIsPopupOpen(true)} 
              >
                <p className="text-white text-2xl font-normal">+</p>
              </div>
            </div>
          </div>
        </div>
       
        {isPopupOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setIsPopupOpen(false)} 
          >
            <div
              className="bg-[#16161C] p-8 rounded-lg"
              onClick={(e) => e.stopPropagation()} 
              style={{
                width: "80%",
                maxWidth: "500px",
              }}
            >
              <p className="text-[#EE69AC] text-2xl font-semibold mb-4">
                Criar tarefa
              </p>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <p className="text-white">Título</p>
                  <input
                    type="text"
                    required
                    className="w-full p-2 mt-1 rounded bg-[#1E1E26] text-white border-none"
                    name="titulo"
                    placeholder="Insira o título da tarefa"
                    value={formData.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                {/* <div className="mb-4">
                  <p className="text-white">Categoria</p>
                  <input
                    type="text"
                    className="w-full p-2 mt-1 rounded bg-[#1E1E26] text-white border-none"
                    name="category"
                    placeholder="Insira a categoria da tarefa"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div> */}
                <div className="mb-4">
                  <p className="text-white">Descrição</p>
                  <textarea
                    className="w-full p-2 mt-1 rounded bg-[#1E1E26] text-white border-none"
                    name="description"
                    placeholder="Insira a descrição da tarefa"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-white inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-pink-600"
                      name="is_priority"
                      checked={formData.is_priority}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Prioridade</span>
                  </label>
                </div>
                <div className="mb-4">
                  <p className="text-white">Data</p>
                  <input
                    type="date"
                    className="w-full p-2 mt-1 rounded bg-[#1E1E26] text-white border-none"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#EE69AC] text-white rounded hover:bg-pink-700"
                  >
                    Criar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
