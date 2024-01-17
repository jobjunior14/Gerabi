import { useState } from "react";
import axios from '../../axiosUrl';
export default function Signup () {

    const [userData, setUserData] = useState({email: "", password: "", confirmPassword: "", name: "",});
    const [error, setError] = useState({email: null, password: null});
    const [errorMessage, setErrorMessage] = useState(false);

    //check if the email is valid or not 
    function isValidEmail (email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //handler for the input field
    const handleChange = (name, value) => {
        //handle the valid email field
        if (name === 'email') {
            setError(prev => {
                return {...prev, email: userData.email === '' ? false : !isValidEmail(value) }
            });
        }
        //handle all the user data 
        setUserData(prev => ({...prev, [name]: value}));
    };

    const signUp = e => {
        //handle the confirm password field
        setError(prev => {
            return {...prev, password: userData.confirmPassword === '' ? false : userData.password !== userData.confirmPassword ? true : false}
        });

        if (error.email === true || error.password === true|| userData.email === '' || userData.password === '' || userData.confirmPassword === '' || userData.name === '') {
            setErrorMessage( true);
        } else {
            setErrorMessage(false);
            e.preventDefault();
        }
    }
    
    return (
        <div className=" flex justify-center mt-10 ">

            <div className= " bg-white border-2 border-slate-400 rounded-md w-96 px-5 py-5">
                <div>
                    <input 
                        id="name" 
                        name="name" 
                        placeholder="Nom" 
                        type="text"
                        value={userData.name}
                        className={`px-2 border-2 'border-gray-800' duration-200  appearance-none w-full h-12 my-3 rounded-lg`}
                        onChange={ e => handleChange(e.target.name, e.target.value)} 
                        />
                </div>

                <div>
                    <input 
                        id="email" 
                        name="email" 
                        placeholder="Adresse Email" 
                        type="text"
                        value={userData.email}
                        className={`px-2  ${error.email ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-full h-12 my-3 rounded-lg`}
                        onChange={ e => handleChange(e.target.name, e.target.value)} 
                    />

                </div>
                <div>
                    <input 
                        id="password" 
                        name="password" 
                        placeholder="Mot De Passe" 
                        type="password"
                        value={userData.password}
                        className={`px-2 border-2 'border-gray-800' duration-200  appearance-none w-full h-12 my-3 rounded-lg`}
                        onChange={ e => handleChange(e.target.name, e.target.value)} 
                        />
                </div>
                <div>
                    <input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Confirmer le Password" 
                        type="password"
                        value={userData.confirmPassword}
                        className={`px-2  ${error.password ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-full h-12 my-3 rounded-lg`}
                        onChange={ e => handleChange(e.target.name, e.target.value)} 
                    />
                </div>
                {errorMessage && <p className="text-red-700 sm:text-base text-xs">Verifier que tout les champ sont bien remplis</p>}
                <div >
                    <button onClick={ e => signUp(e)} className="bg-indigo-500 py-2 px-4 w-full text-white sm:text-xl text-lg font-bold my-4 rounded-md"> Créer un compte</button>
                </div>

                <div>
                    <button className=" text-indigo-500 mb-4"> J&apos;ai deja un compte</button>
                </div>
            </div>

        </div>
    )
}