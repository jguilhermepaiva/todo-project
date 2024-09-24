import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-project-backend-lgyz.onrender.com',
});

export default api;
