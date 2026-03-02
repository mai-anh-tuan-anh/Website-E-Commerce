import axios from 'axios';
// method create cua axios nhan ve 1 doi tuong
const axiosClient = axios.create({
    baseURL: 'https://be-project-reactjs.onrender.com/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
export default axiosClient;
