import { useState } from "react";
import axios from '../../axiosUrl';
import {useNavigate} from 'react-router-dom'
import useDateParams from "../reuseFunction/dateParams";
export default function Login () {

    const navigate = useNavigate();
    const {currentDay, currentYear, currentMonth} = useDateParams();

    const [userData, setUserData] = useState({email: "", password: ""});
    let formError = null;
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);

    //check if the email is valid or not 
    function isValidEmail (email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //handle the form field error
    formError = ( userData.email === '' ? false : !isValidEmail(userData.email));
    //handler for the input field
    const handleChange = (name, value) => {
        setUserData(prev => ({...prev, [name]: value}));
    };

    //fetch the data to the server
    const loginButton = e => {

        if (!formError) {
            const fecthData = async () => {
    
                setLoading(true);
                try {
                        const authorisation = await axios.post ('/user/login', userData);
        
                        //if response is OK, redirect to the home page
                        if (authorisation.status) {
                            localStorage.setItem('jwtA', authorisation.data.token);
                            localStorage.setItem('degoUser', authorisation.data.data.name)
                            navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
                        }
    
                } catch (error) {
                    setLoading(false);
                    setLoginError(error);
                } finally {
                    setLoading(false);
                }
    
            }; fecthData()
            e.preventDefault();
        }
    };
    
    const createAcount = () => {
        navigate('/signup');
    };
    const forgetPassword = () => {
        navigate('/forgetPassword');
    };
    
    return (
        <div className='flex justify-center'>

            <div className=" flex justify-center mt-10 bg-white dark:bg-gray-800 border-2 border-slate-400 rounded-md min-w-60 px-5 py-5">

                <div>
                    {/* display the errorMessage */}
                    {loginError && <p className='text-red-700 text-sm'>{loginError.response ? `${loginError.response.data.message}` : `Erreur de connecion`}</p>}
                    <form onSubmit={e => loginButton(e)} className=" w-70 px-5 py-5 ">

                        <input 
                            id="email" 
                            name="email" 
                            placeholder="Adresse E-Mail" 
                            type="text"
                            value={userData.email}
                            className={`px-2  ${formError ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg `}
                            onChange={ e => handleChange(e.target.name, e.target.value)} 
                        />
                        <input 
                            id="password" 
                            name="password" 
                            placeholder="Mot De Passe" 
                            type="password"
                            value={userData.password}
                            className={`px-2 border-2 'border-gray-800' duration-200  appearance-none w-4/5 h-12 my-3 rounded-lg`}
                            onChange={ e => handleChange(e.target.name, e.target.value)} 
                        />

                        <button disabled={loading || formError} className={` ${loading ? 'bg-indigo-200' : 'bg-indigo-500'} py-2 px-4 w-4/5 text-white text-xl font-bold my-4 rounded-md`}>{loading ? '...' : 'Se Connecter' }</button>
                    </form>

                    <button onClick={forgetPassword} className=" text-indigo-500 mb-4"> Mot De passe Oublié</button>
                    <hr />
                    <button onClick={createAcount} className=" bg-slate-600 max-w-72 mt-6 rounded-md py-2 px-4 text-white text-xl font-medium">Créer Un Compte</button>

                </div>
            </div>
        </div>
    )
}