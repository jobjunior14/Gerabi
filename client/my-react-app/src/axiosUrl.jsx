import axios from 'axios';

// https://degobar.onrender.com
const axiosUrl = 

        axios.create({
        baseURL: import.meta.env.VITE_API,
    });


export default axiosUrl;
