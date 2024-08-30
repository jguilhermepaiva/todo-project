import React, { useState, useEffect } from "react";
import api from "./api";
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    category: '',
    description: '',
    is_priority: false,
    date: '',
  });

  const fetchTodos = async () => {
    const response = await api.get('/todos/');
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  const handleInputChange = (event) => {
    const value = event.target.value === 'checkbox' ? event.targe.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/todos/', formData);
    fetchTodos();
    setFormData({
      titulo: '',
      category: '',
      description: '',
      is_priority: false,
      date: '',
    });
  };

  return (
    <div>
      <div style={{background: "#16161C", width: "80%", margin: "10px auto", borderRadius: "10px", padding: "25px", color: "white"}}>
        <p className="navbar-brand" style={{color: "#EE69AC", fontSize: "26px"}}>
          Criar tarefa
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="m-3" style={{}}>
              <p>Título</p>
              <input type="text" className="form-control"  name="titulo" placeholder="Insira o título da tarefa" value={formData.titulo} onChange={handleInputChange} style={{background:"#1E1E26", color:"white", border: "none"}}/>
              
            </div>
            <div className="m-3">
              <p>Categoria</p>
              <input type="text" className="form-control" name="category" placeholder="Insira a categoria da tarefa" value={formData.category} onChange={handleInputChange} style={{background:"#1E1E26", color:"white", border: "none"}} />
            </div>
            <div className="m-3">
              <p>Descrição</p>
              <textarea type="text" rows="4" className="form-control" name="description" placeholder="Insira a descrição da tarefa" value={formData.description} onChange={handleInputChange} style={{background:"#1E1E26",  border: "none"}}/>
            </div>
            <div className="m-3" style={{display: "flex", alignItems: "center"}}>
              <p style={{margin:"5px"}}>Prioridade?</p>
              <input type="checkbox" className="" name="is_priority"  value={formData.is_priority} onChange={handleInputChange}  />
            </div>
            <div className="m-3">
              <input type="text" className="form-control" name="date" value={formData.date} onChange={handleInputChange} style={{background:"#1E1E26", color:"white", border: "none" }}/>
            </div>
            <div className="m-3" style={{display:"flex", alignItem:"center", justifyContent:"center", }}>

            <button type="submit" style={{color: "white", padding:"10px 100px",border: "none" ,borderRadius: "5px", background: "linear-gradient(45deg, #F29682, #EE69AC , #CB4BCF)", }}>Adicionar</button>

            </div>
          </form>
        </div>
          <table className="table table-striped table-bordered table-hover" style={{margin: "20px auto", width: "80%",}}>
            <thead>
              <th>titulo</th>
              <th>Category</th>
              <th>Description</th>
              <th>Prioridade?</th>
              <th>Date</th>
            </thead>
            <tbody>
              {todos.map((todo)=> (
                <tr key={todo.id}>
                  <td>{todo.titulo}</td>
                  <td>{todo.category}</td>
                  <td>{todo.description}</td>
                  <td>{todo.is_priority ? 'Yes' : 'No'}</td>
                  <td>{todo.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
           {/* <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <div>{todo.titulo}</div>
                <div>{todo.category}</div>
                <div>{todo.description}</div>
                <div>{todo.is_priority ? 'Income' : 'Expense'}</div>
                <div>{todo.date}</div>
              </li>
            ))}
          </ul>  */}

    </div>
  )
}

export default App;