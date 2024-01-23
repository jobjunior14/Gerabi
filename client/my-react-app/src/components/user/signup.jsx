import { useState } from "react";
import axios from '../../axiosUrl';
import { useNavigate } from "react-router-dom";
import useDateParams from "../reuseFunction/dateParams";
export default function Signup () {

    const {currentDay, currentMonth, currentYear} = useDateParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({email: "", password: "", confirmPassword: "", name: "",});
    let error = {email: null, password: null};
    const [loading, setLoading] = useState(false);
    const [signupError, setSignupError] = useState(false);

    //check if the email is valid or not 
    function isValidEmail (email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //handler for the input field
    const handleChange = (name, value) => {
        //handle all the user data 
        setUserData(prev => ({...prev, [name]: value}));
        //handle the valid email field
    };
    //handle the error's field
    error.email = userData.email === '' ? false : !isValidEmail(userData.email); 
    error.password = userData.confirmPassword === '' ? false : userData.password !== userData.confirmPassword;

    const signUp = e => {
        //handle the confirm password field

        const fecthData = async () => {

            setLoading(true);
            try {
                    const authorisation = await axios.post ('/user/signup', userData);
    
                    //if response is OK, redirect to the home page
                    if (authorisation.status) {
                        localStorage.setItem('jwtA', authorisation.data.token);
                        navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
                    }

            } catch (error) {
                setLoading(false);
                setSignupError(error);
            } finally {
                setLoading(false);
            }

        }; fecthData()
        e.preventDefault();
        e.preventDefault();
    }
    
    return (
        <div className=" flex justify-center">

        <div className=" flex justify-center mt-10 bg-white border-2 border-slate-400 rounded-md min-w-60 px-5 py-5">

            <div>
                {/* display the errorMessage */}
                {signupError && <p className='text-red-700 text-sm'>{signupError.response ? `${signupError.response.data.message}` : `erreur de connexion`}</p>}
                <form onSubmit={signUp} className= "  w-96 px-5 py-5">

                    <input 
                        id="name" 
                        name="name" 
                        placeholder="Nom" 
                        type="text"
                        value={userData.name}
                        className={`px-2 border-2 'border-gray-800' duration-200  appearance-none w-full h-12 my-3 rounded-lg`}
                        onChange={ e => handleChange(e.target.name, e.target.value)} 
                    />

                    <input 
                        id="email" 
                        name="email" 
                        placeholder="Adresse Email" 
                        type="text"
                        value={userData.email}
                        className={`px-2  ${error.email ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-full h-12 my-3 rounded-lg`}
                        onChange={ e => handleChange(e.target.name, e.target.value)} 
                    />

                    <input 
                        id="password" 
                        name="password" 
                        placeholder="Mot De Passe" 
                        type="password"
                        value={userData.password}
                        className={`px-2 border-2 'border-gray-800' duration-200  appearance-none w-full h-12 my-3 rounded-lg`}
                        onChange={ e => handleChange(e.target.name, e.target.value)} 
                    />

                    <input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Confirmer le Password" 
                        type="password"
                        value={userData.confirmPassword}
                        className={`px-2  ${error.password ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-full h-12 my-3 rounded-lg`}
                        onChange={ e => handleChange(e.target.name, e.target.value)} 
                    />
                    <p className="text-red-700 sm:text-base text-xs">{error.email ? 'Veillez taper une Adresse mail valide' : error.password ? 'vos mots de passe ne correspondent pas' : ''}</p>
                    <button disabled={loading || error.email || error.password} onClick={ e => signUp(e)} className="bg-indigo-500 py-2 px-4 w-full text-white sm:text-xl text-lg font-bold my-4 rounded-md"> {loading ? '...' : 'Créer un compte'} </button>

                </form>
                <button className=" text-indigo-500 mb-4"> J&apos;ai deja un compte</button>
            </div>

        </div>
    </div>)
}