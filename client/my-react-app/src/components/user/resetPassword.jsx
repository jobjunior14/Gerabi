import { useState } from "react";
import axios from '../../axiosUrl';
import {useNavigate, useParams} from 'react-router-dom';
import useDateParams from "../reuseFunction/dateParams";

export default function ForgetPassword () {

    const navigate = useNavigate();
    const { token } = useParams;
    const {currentDay, currentYear, currentMonth} = useDateParams();


    const [userData, setUserData] = useState({newPassword: '', newConfirmPassword: ''});
    const [formError, setFormError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);

    //handler for the input field
    const handleChange = (name, value) => {
        setUserData(prev => ({...prev, [name]: value}));

        if (userData.newPassword !== userData.newConfirmPassword) {
            setFormError(true);
        }
    };

    //fetch the data to the server
    const resetPasswordButton = e => {

        const fecthData = async () => {

            setLoading(true);
            try {

                const authorisation = await axios.patch (`/user/resetPassword/${token}`, userData);
                if (authorisation) {
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
    };
    
    const loginPage = () => {
        navigate('/login');
    }

    return (

        <div className='flex justify-center'>

            <div className=" flex justify-center mt-10 bg-white border-2 border-slate-400 rounded-md min-w-60 px-5 py-5">

                <div>
                    {/* display the errorMessage */}
                    {loginError && <p className='text-red-700 text-sm'>{loginError.response ? `${loginError.response.data.message}` : `erreur de connexion`}</p>}
                    <form onSubmit={e => resetPasswordButton(e)} className=" w-70 px-5 py-5 ">

                        <input 
                            id="password" 
                            name="newPassword" 
                            placeholder="Votre nouveau mot de passe" 
                            type="password" 
                            value={userData.newPassword}
                            className={`px-2  ${formError ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg`}
                            onChange={ e => handleChange(e.target.name, e.target.value)} 
                        />
                        <input 
                            id="confirmaPassword" 
                            name="newConfirmPassword" 
                            placeholder="Confirmer le mot de passe" 
                            type="password"
                            value={userData.newConfirmPassword}
                            className={`px-2  ${formError ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg`}
                            onChange={ e => handleChange(e.target.name, e.target.value)} 
                        />
                        <button disabled={loading || formError} className="bg-indigo-500 py-2 px-4 w-4/5 text-white text-xl font-bold my-4 rounded-md">{loading ? '...' : 'Envoyer' }</button>
                    </form>

                    <button onClick={loginPage} className=" text-indigo-500 mb-4"> J&apos;ai deja un compte</button>
                    <hr />

                </div>
            </div>
        </div>
    );
    
    
}