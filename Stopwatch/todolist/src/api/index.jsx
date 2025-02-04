const API_BASE_URL = 'http://3.109.211.104:8001';

// Login API
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

// SignUp API
export const signUpUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

// Fetch all todos
export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  return response.json();
};

// Create a new todo
export const createTodo = async (todo) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return response.json();
};

// Update a todo
export const updateTodo = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
};

// Fetch user profile
export const fetchProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
    },
  });
  return response.json();
};

// Update user profile
export const updateProfile = async (data) => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
    },
    body: JSON.stringify(data),
  });
  return response.json();
};