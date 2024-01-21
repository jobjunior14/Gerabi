/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function LoadingError ({message}) {
    return (
        <div className="my-10">
        <h2 className="text-2xl text-gray-800">Ces données sont manquantes s&apos;il vous retourner à la page d&apos;<Link className="underline hover:text-indigo-600 text-gray-800" to={'/'}>Acceuil</Link> ou resseyer plus tard</h2>
        <p className="text-red-700 my-5">{message}</p>
        </div>
    )
}