import axios from 'axios';
const acesstoken = localStorage.getItem('token');

const api = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		Authorization: acesstoken ? acesstoken : '',
	},
});

export default api;
