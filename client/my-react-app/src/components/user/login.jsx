import { useState } from "react";
import axios from '../../axiosUrl';
export default function Login () {

    const [userData, setUserData] = useState({email: "", password: ""});
    const [error, setError] = useState(null);
    //check if the email is valid or not 
    function isValidEmail (email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //handler for the input field
    const handleChange = (name, value) => {
        
        if (name === 'email') setError( userData.email === '' ? false : !isValidEmail(value));

        setUserData(prev => ({...prev, [name]: value}));
    };

    const loginButton = e => {

        e.preventDefault();
    }
    
    return (
        <div className=" flex justify-center mt-10 ">

            <div className= " bg-white border-2 border-slate-400 rounded-md w-96 px-5 py-5">
                <div>
                    <input 
                        id="email" 
                        name="email" 
                        placeholder="Adresse E-Mail" 
                        type="text"
                        value={userData.email}
                        className={`px-2  ${error ? 'border-red-700' : 'border-gray-800'} duration-200  appearance-none border-2 w-full h-12 my-3 rounded-lg`}
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

                <div >
                    <button className="bg-indigo-500 py-2 px-4 w-full text-white text-xl font-bold my-4 rounded-md"> Se Connecter</button>
                </div>

                <div>
                    <button className=" text-indigo-500 mb-4"> Mot De passe Oublié</button>
                </div>
                <hr />
                <button className=" bg-slate-600 max-w-72 mt-6 rounded-md py-2 px-4 text-white text-xl font-medium">Créer Un Compte</button>
            </div>

        </div>
    )
}