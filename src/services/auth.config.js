const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/mywallet";

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', process.env.REACT_APP_ENVIRONMENT || 'development');

export default API_BASE_URL;