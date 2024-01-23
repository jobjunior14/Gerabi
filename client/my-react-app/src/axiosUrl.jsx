import axios from 'axios';

// https://degobar.onrender.com
const axiosUrl = 

        axios.create({
        baseURL: 'http://192.168.43.231:5001/api/v1/',
    });


export default axiosUrl;
