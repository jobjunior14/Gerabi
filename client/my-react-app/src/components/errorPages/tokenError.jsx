import { useNavigate } from "react-router-dom";

export default function useTokenError (error) {

    const navigate = useNavigate();
    if (error && error.message !== 'Network Error') {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message;
        if (statusCode === 401 || statusCode === 406 || statusCode === 400 || errorMessage === 'jwt malformed') {
            navigate ('/login');
        }
    }
}