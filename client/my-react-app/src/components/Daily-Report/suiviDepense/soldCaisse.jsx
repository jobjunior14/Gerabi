/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

export default function SoldCaisse ({loading}) {


    const sortieCaisseData = useSelector (state => state.suiviDepense.sortieCaisse);
   
    const soldCaisse = useSelector (state => state.suiviDepense.soldCaisse);


    if (!loading && sortieCaisseData){

        if (sortieCaisseData.length > 0) {

            return (
                <h3 className="font-bold text-xl lg:text-2xl text-indigo-700 p-4"> Sold Caisse: {soldCaisse}</h3>
            )
        }
    } else {

        return (<h4> Chargement...</h4>)
    }
}