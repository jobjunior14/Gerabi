/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function PostAndUpdateError ({message}) {
   
    return (
      <div className="my-90">
        <h2 className="text-2xl text-gray-800 dark:text-gray-50">Un probleme est survenu lors de la mise à jours des données s&apos;il vous retourner à la page d&apos;<Link className="underline hover:text-indigo-600 dark:text-gray-50 text-gray-800" to={'/'}>Acceuil</Link></h2>
        <p className="text-red-600 my-4">{message}</p>
      </div>
    ); 
}