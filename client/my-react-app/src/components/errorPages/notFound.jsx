import { Link } from "react-router-dom"
export default  function NotFound () {
    return (<div className="my-10 text-center p-8">
        <h1 className="text-2xl text-red-700 font-bold my-4">404</h1>
        <p className="text-xl font-normal dark:text-gray-50"> Page Not Found</p>
        <Link className="underline text-left hover:text-indigo-600 text-gray-700 dark:text-gray-50" to={'/'}>Acceuil</Link>
    </div>)
}