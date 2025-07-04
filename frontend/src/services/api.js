// /frontend/src/services/api.js

// Lê a variável de ambiente com o prefixo correto para Create React App.
// Se não a encontrar, usa a URL de desenvolvimento local como fallback.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

/**
 * Função central para fazer chamadas de API autenticadas.
 * @param {string} endpoint - O endpoint da API (ex: '/todos/').
 * @param {RequestInit} options - As opções da requisição fetch.
 * @returns {Promise<any>} Os dados da resposta da API.
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `Erro na requisição para ${endpoint}`);
  }

  // Retorna os dados se a resposta tiver conteúdo, senão retorna null
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return null;
};

// --- Funções de API ---

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Falha no login.');
  }
  return response.json();
};

export const registerUser = async (userData) => {
  return apiFetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
};

export const getProfile = async () => {
  return apiFetch('/users/me');
};

export const getTodos = async () => {
  return apiFetch('/todos/');
};

export const createTodo = async (todoData) => {
  return apiFetch('/todos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoData),
  });
};

export const deleteTodo = async (todoId) => {
  return apiFetch(`/todos/${todoId}`, {
    method: 'DELETE',
  });
};

export const verifyToken = async (token) => {
  // Esta rota específica pode não precisar do cabeçalho de autorização
  // dependendo de como foi implementada.
  const response = await fetch(`${API_BASE_URL}/verify-token/${token}`);
  if (!response.ok) {
    throw new Error("Token verification failed");
  }
  return response.json();
};
