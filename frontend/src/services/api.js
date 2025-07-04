// A URL base da nossa API.
// Em desenvolvimento, aponta para localhost.
// Em produção (no Vercel), aponta para a URL do nosso backend no Render.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Função para fazer o login
export const loginUser = async (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Falha no login');
  }
  return response.json();
};

// Adicione aqui outras funções para os seus endpoints (ex: getTodos, createTodo, etc.)
// Exemplo:
export const getTodos = async (token) => {
  const response = await fetch(`${API_BASE_URL}/todos/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Falha ao buscar tarefas');
  }
  return response.json();
}
