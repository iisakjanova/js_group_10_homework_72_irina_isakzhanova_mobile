import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://irina-isakjanova-default-rtdb.firebaseio.com/lab'
});

export default axiosApi;