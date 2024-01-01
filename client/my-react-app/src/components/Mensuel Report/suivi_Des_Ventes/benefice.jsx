import { useSelector } from "react-redux";
import searchImage from "../../../assets/searchImage.png"

export default function Benefice ({depenseEff}) {

    //data
    const data = useSelector(state => state.mensRapport.suiviVente);
    const perte = useSelector(state => state.mensRapport.perte);
    
    // useEffect(() => {

    // }, [data, perte])
    if ( data.bralima && data.brasimba && data.autreProduit && data.liqueurs ) {

        if ( data.bralima.length > 0 && data.brasimba.length > 0 && data.autreProduit.length > 0 && data.liqueurs.length > 0 ) {

            const total = data.bralima[0].benefice + data.brasimba[0].benefice + data.autreProduit[0].benefice + data.liqueurs[0].benefice;

            return (<div className=" justify-center flex"> 

                <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute"> BENEFICE </h3>
                <div className=" text-center items-center justify-center my-10 ">

                    <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900">
                        <thead>
                            <tr>
                                <th className=" py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900"> Libelé </th>
                                <th className=" py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900"> Montant </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-100">
                                <td className="border-2 border-gray-800"> Bralima </td>
                                <td className="border-2 border-gray-800"> {data.bralima[0].benefice}</td>
                            </tr>
                            <tr>
                                <td className="border-2 border-gray-800"> Brasimba </td>
                                <td className="border-2 border-gray-800"> {data.brasimba[0].benefice}</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="border-2 border-gray-800"> Autre Produit </td>
                                <td className="border-2 border-gray-800"> {data.autreProduit[0].benefice}</td>
                            </tr>
                            <tr>
                                <td className="border-2 border-gray-800"> Liqueurs </td>
                                <td className="border-2 border-gray-800"> {data.liqueurs[0].benefice}</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="border-2 border-gray-800"> Total </td>
                                <td className="border-2 border-gray-800"> {total}</td>
                            </tr>
                            <tr>
                                <td className="border-2 border-gray-800"> _</td>
                                <td className="border-2 border-gray-800">_</td>
                            </tr>
                            <tr className="bg-red-100">
                                <td className="border-2 border-gray-800"> Pertes </td>
                                <td className="border-2 border-gray-800"> {perte}</td>
                            </tr>
                            <tr>
                                <td className="border-2 border-gray-800"> Dépenses éffectuées  </td>
                                <td className="border-2 border-gray-800"> {depenseEff}</td>
                            </tr>
                            <tr className="bg-green-100">
                                <td className="border-2 border-gray-800">Benefice net  </td>
                                <td className="border-2 border-gray-800"> {total - (perte + depenseEff)} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>)
        } else {
          return (<div className="m-4">
                <h3 className="lg:text-2xl text-xl font-semibold text-gray-700"> BENEFICE</h3>
                <div className=" flex items-center justify-center h-3/4 ">
                  <img className=" h-80 w-auto" src={searchImage} alt="search image" />
                </div>
                <h4 className="lg:text-3xl text-2xl text-gray-700 ">Ouuppss!! cette date n'a pas des donnees</h4>
            </div>);
        }
    } else {
       return (<div className=" justify-center flex">
            <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute"> BENEFICE</h3>
            <div className=" items-center justify-center my-40"> 
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                    <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                    <div className="w-5 h-5 rounded-full animate-pulse dark:bg-indigo-400"></div>
                </div>
          </div>
        </div>)
    }

}