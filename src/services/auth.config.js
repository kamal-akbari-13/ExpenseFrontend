const API_BASE_URL = "https://expensebackend-pi2w.onrender.com/mywallet";

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', process.env.REACT_APP_ENVIRONMENT || 'production');

export default API_BASE_URL;