import { useState } from "react";
import axios from '../../axiosUrl';
import {useNavigate} from 'react-router-dom';
import useDateParams from "../reuseFunction/dateParams";

export default function UserPage () {

    const navigate = useNavigate();
    const {currentDay, currentYear, currentMonth} = useDateParams();

    //to update the password if the user is logged in
    const [userDataPassword, setUserDataPassword] = useState({newPassword: '', newConfirmPassword: '', oldPassword: ''});
    const [userDataInfo, setUserDataInfo] = useState({email: '', name: ''});
    const [formError, setFormError] = useState({email: null, password: null});
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);
    //state define if user wants to update password or it informations
    const [updatePassword, setUpdatePassword] = useState(false);
    const [updateInfo, setUpdateInfo] = useState(false);

    const headers = {
        headers: {
            "content-type": "application/json", 'withCredentials': true,
            'authorization': `Bearer ${localStorage.getItem('jwtA')}`
        }
    };

     //check if the email is valid or not 
    function isValidEmail (email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //handler for the input field
    const handleChange = (name, value) => {

        if (updateInfo) {
            setUserDataInfo(prev => ({...prev, [name]: value}));
            if (name === 'email') setFormError( prev => ({...prev, email: userDataInfo.email === '' ? false : !isValidEmail(value) }));
            
        } else if (updatePassword) {

            setUserDataPassword(prev => ({...prev, [name]: value}));
            if (userDataPassword.newPassword !== userDataPassword.newConfirmPassword && userDataPassword.newConfirmPassword !== '') {
                setFormError(prev => ({...prev, password: true}));
            } else {
                
                setFormError(prev => ({...prev, password: false}));
            }
        }
    };

    //fetch the data to the server
    const updateInformation = e => {

        const fecthData = async () => {

            if (!formError.email && !formError.password ) {
                
                setLoading(true);
                try {
                    const authorisation = updateInfo ? await axios.patch (`/user/updateUser`, userDataInfo, headers) : 
                        await axios.patch(`/user/updatePassword`, userDataPassword, headers);
    
                    if (authorisation) {
                        localStorage.setItem('jwtA', authorisation.data.token);
                        localStorage.setItem('degoUser', authorisation.data.data.name);
                        navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
                    }
    
                } catch (error) {
                    setLoading(false);
                    setLoginError(error);
                } finally {
                    setLoading(false);
                }
            }

        }; fecthData()
        e.preventDefault();
    };
    
    //redirect to the home page
    const homePage = () => {
        navigate(`/rapportJournalier/degoBar/product/bralima?year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
    };

    const handleUpdateInfo = () => {
        setUpdateInfo(true);
        setUpdatePassword(false);
    };

    const handleUpdatePassword = () => {
        setUpdateInfo(false);
        setUpdatePassword(true);
    };

    const homeUserPage = () => {
        setUpdateInfo(false);
        setUpdatePassword(false);
    }

    if (updateInfo === false && updatePassword === false) {
        return (
            <div >
                <p className="my-10 text-gray-700 text-2xl font-bold">Bievenue {localStorage.getItem('degoUser')}</p>
                <button className=" w-52 p-3 hover:bg-slate-200 duration-200 hover:scale-110 bg-slate-100 mx-14 my-10 text-gray-700 font-semibold h-40 rounded-lg border-2" onClick={handleUpdateInfo}>Mettre à jour vos informations</button>
                <button className=" w-52 p-3 hover:bg-slate-200 duration-200 hover:scale-110 bg-slate-100 mx-14 my-10 text-gray-700 font-semibold h-40 rounded-lg border-2" onClick={handleUpdatePassword}>Mettre à jours votre mot de passe</button>
            </div>
        );
    } else if (updatePassword) {

        return (
    
            <div className='flex justify-center'>
                <div className=" flex justify-center mt-10 bg-white border-2 border-slate-400 rounded-md min-w-60 -px-10 py-5 relative">

                    <div>
                        <div className="relative flex ">
                            <button onClick={homeUserPage} className="pb-1 pr-px text-gray-700 hover:bg-slate-400 duration-150 text-xl rigth-50 place-content-end mx-5 bg-slate-200 w-8 h-8 rounded-full"> {'<'}</button>
                        </div>
                        <p className="my-2 text-gray-700 text-xl font-bold">Bievenue {localStorage.getItem('degoUser')}</p>
                        {/* display the errorMessage */}
                        {loginError && <p className='text-red-700 text-sm'>{loginError.response ? `${loginError.response.data.message}` : `${loginError.message}`}</p>}
                        {formError.password && <p className='text-red-700 text-sm'>Vos mots de passe ne correspondent pas</p>}
                        <form onSubmit={e => updateInformation(e)} className=" w-70 px-5 py-5 ">
    
                            <input 
                                id="oldpassword" 
                                name="oldPassword" 
                                placeholder="Votre Ancien mot de passe" 
                                type="password" 
                                value={userDataPassword.oldPassword}
                                className={`px-2 border-gray-800 duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg`}
                                onChange={ ( e ) => handleChange(e.target.name, e.target.value)} 
                            />
                            <input 
                                id="password" 
                                name="newPassword" 
                                placeholder="Votre nouveau mot de passe" 
                                type="password" 
                                value={userDataPassword.newPassword}
                                className={`px-2  border-gray-80 duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg`}
                                onChange={ e => handleChange(e.target.name, e.target.value)} 
                            />
                            <input 
                                id="confirmaPassword" 
                                name="newConfirmPassword" 
                                placeholder="Confirmer le mot de passe" 
                                type="password"
                                value={userDataPassword.newConfirmPassword}
                                className={`px-2  ${formError.password ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg`}
                                onChange={ e => handleChange(e.target.name, e.target.value)} 
                            />
                            <button disabled={loading} className="bg-indigo-500 py-2 px-4 w-4/5 text-white text-xl font-bold my-4 rounded-md">{loading ? '...' : 'Envoyer' }</button>
                        </form>
    
                        <button onClick={homePage} className=" text-indigo-500 mb-4"> Page d&apos;acceuille</button>
                        <hr />
    
                    </div>
                </div>
            </div>
        );
    } else if (updateInfo) {
        return (
            <div className='flex justify-center'>
    
                <div className=" flex justify-center mt-10 bg-white border-2 border-slate-400 rounded-md min-w-60 -px-10 py-5">

                    <div>
                        <div className="relative flex ">
                            <button onClick={homeUserPage} className="pb-1 pr-px text-gray-700 hover:bg-slate-400 duration-150 text-xl rigth-50 place-content-end mx-5 bg-slate-200 w-8 h-8 rounded-full"> {'<'}</button>
                        </div>
                        <p className="my-2 text-gray-700 text-xl font-bold">Bievenue {localStorage.getItem('degoUser')}</p>
                        {/* display the errorMessage */}
                        {loginError && <p className='text-red-700 text-sm'>{loginError.response ? `${loginError.response.data.message}` : `${loginError.message}`}</p>}
                        {formError.email && <p className='text-red-700 text-sm'>Verifier votre adresse email</p>}
                        <form onSubmit={e => updateInformation(e)} className=" w-70 px-5 py-5 ">

                            <input 
                                id=" name" 
                                name="name" 
                                placeholder="Votre nouveau nom" 
                                type="text" 
                                value={userDataInfo.name}
                                className={`px-2 border-gray-800 duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg`}
                                onChange={ e => handleChange(e.target.name, e.target.value)} 
                            />
                            <input 
                                id="email" 
                                name="email" 
                                placeholder="votre nouvel Address Mail" 
                                type="text"
                                value={userDataInfo.email}
                                className={`px-2  ${formError.email ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-4/5 h-12 my-3 rounded-lg`}
                                onChange={ e => handleChange(e.target.name, e.target.value)} 
                            />
                            <button disabled={loading} className="bg-indigo-500 py-2 px-4 w-4/5 text-white text-xl font-bold my-4 rounded-md">{loading ? '...' : 'Envoyer' }</button>
                        </form>
    
                        <button onClick={homePage} className=" text-indigo-500 mb-4"> Page d&apos;acceuille</button>
                        <hr />
    
                    </div>
                </div>
            </div>
            
        );
    }
    
}