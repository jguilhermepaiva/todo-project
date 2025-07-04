// Lê a variável de ambiente com o prefixo correto para Create React App.
// Se não a encontrar, usa a URL de desenvolvimento local como fallback.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

/**
 * Função para fazer o login do utilizador.
 * @param {string} username - O nome de utilizador.
 * @param {string} password - A senha.
 * @returns {Promise<any>} Os dados da resposta da API.
 */
export const loginUser = async (username, password) => {
  // Create React App não lida bem com FormData no 'body' para CORS em algumas configurações.
  // Enviar como JSON é mais robusto. O seu backend FastAPI já suporta isto.
  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error('Falha no login. Verifique as suas credenciais.');
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
