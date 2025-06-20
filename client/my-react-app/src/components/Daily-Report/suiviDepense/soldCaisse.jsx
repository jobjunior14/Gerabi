/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import LoadingError from "../../errorPages/LoadingError";
import PostAndUpdateError from "../../errorPages/postAndUpdateError";


export default function SoldCaisse ({loading, error, pError}) {


    const sortieCaisseData = useSelector (state => state.suiviDepense.sortieCaisse);
   
    const soldCaisse = useSelector (state => state.suiviDepense.soldCaisse);

    if (pError) {
        return (<PostAndUpdateError message={pError.message}/>);
    } else {
        if (!loading && sortieCaisseData){
    
            if (sortieCaisseData.length > 0) {
    
                return (
                    <h3 className="font-bold text-xl lg:text-2xl text-indigo-700 p-4 dark:text-violet-400"> Sold Caisse: {soldCaisse}</h3>
                );
            }
        } else {
            
            if (loading) {

                return (<h1 className="text-xl my-5 font-semibold animate-pulse dark:text-gray-50">Chargement...</h1>);
            }
            if (error) {
                return (<LoadingError message={error.message}/>);
            }
        }
    }
}