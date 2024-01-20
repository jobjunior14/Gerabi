import axios from 'axios';
// 192.168.43.231:
const axiosUrl = 

        axios.create({
        baseURL: 'http://localhost:5001/api/v1/',
    });

export default axiosUrl;
