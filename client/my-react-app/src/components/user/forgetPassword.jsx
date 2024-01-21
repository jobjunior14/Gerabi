import { useState } from "react";
import axios from '../../axiosUrl';
import {useNavigate} from 'react-router-dom';


export default function ForgetPassword () {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [blankPage, setBlankPage] = useState(false);

    //check if the email is valid or not 
    function isValidEmail (email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //handler for the input field
    const handleChange = (name, value) => {
        
        if (name === 'email') setFormError( email === '' ? false : !isValidEmail(value));

        setEmail(value);
    };

    //fetch the data to the server
    const forgetPasswordButton = e => {

        const fecthData = async () => {

            setLoading(true);
            try {
                    const authorisation = await axios.post ('/user/forgetPassword', {email});
                    if (authorisation) setBlankPage(true)
            } catch (error) {
                setLoading(false);
                setLoginError(error);
            } finally {
                setLoading(false);
            }

        }; fecthData()
        e.preventDefault();
    };
    
    const loginPage = () => {
        navigate('/login');
    };


    if (blankPage) {
        return (
            <div className="my-20">
                <p className="text-gray-600 my-5 text-2xl">Un Lien a été envoyer à votre adresse mail</p>
            </div>
        )
    } else  {

        return (

            <div className='flex justify-center'>

                <div className=" flex justify-center mt-10 bg-white border-2 border-slate-400 rounded-md min-w-60 px-5 py-5">

                    <div>
                        {/* display the errorMessage */}
                        {loginError && <p className='text-red-700 text-sm'>{loginError.response ? `${loginError.response.data.message}` : `${loginError.message}`}</p>}
                        <form onSubmit={e => forgetPasswordButton(e)} className=" w-70 px-5 py-5 ">

                            <input 
                                id="email" 
                                name="email" 
                                placeholder="Adresse E-Mail" 
                                type="text"
                                value={email}
                                className={`px-2  ${formError ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg`}
                                onChange={ e => handleChange(e.target.name, e.target.value)} 
                            />
                            <button disabled={loading} className="bg-indigo-500 py-2 px-4 w-4/5 text-white text-xl font-bold my-4 rounded-md">{loading ? '...' : 'Envoyer' }</button>
                        </form>

                        <button onClick={loginPage} className=" text-indigo-500 mb-4"> J&apos;ai deja un compte</button>
                        <hr />

                    </div>
                </div>
            </div>
        );
    }
    
}