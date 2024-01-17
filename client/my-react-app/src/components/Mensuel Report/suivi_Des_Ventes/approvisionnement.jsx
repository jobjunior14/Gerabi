import { useSelector } from "react-redux";
import searchImage from "../../../assets/searchImage.png"

export default function Approvisionnement () {

    //data
    const data = useSelector(state => state.mensRapport.suiviVente);
    
    const thStyle = " py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900";
    const tdStyle = "border-2 border-gray-800";
    if (data.bralima && data.brasimba && data.liqueurs && data.autreProduit) {

        if (data.bralima.length > 0 && data.brasimba.length > 0 && data.liqueurs.length > 0 && data.autreProduit.length > 0) {

            const total = data.bralima[0].approvisionnement + data.brasimba[0].approvisionnement + data.autreProduit[0].approvisionnement + data.liqueurs[0].approvisionnement;

            return (<div  className=" justify-center flex"> 

                <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 absolute"> APPROVISIONNEMENT</h3>
                <div className=" text-center items-center justify-center my-10 ">
                    <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900">

                        <thead>
                            <tr>
                                <th className={thStyle}> Libelé </th>
                                <th className={thStyle}> Montant </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-100">
                                <td className={tdStyle}> Bralima </td>
                                <td className={tdStyle}> {data.bralima[0].approvisionnement}</td>
                            </tr>
                            <tr>
                                <td className={tdStyle}> Brasimba </td>
                                <td className={tdStyle}> {data.brasimba[0].approvisionnement}</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className={tdStyle}> Autre Produit </td>
                                <td className={tdStyle}> {data.autreProduit[0].approvisionnement}</td>
                            </tr>
                            <tr >
                                <td className={tdStyle}> Liqueurs </td>
                                <td className={tdStyle}> {data.liqueurs[0].approvisionnement} </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100">
                                <td className={tdStyle}> Total </td>
                                <td className={tdStyle}> {total}</td>
                            </tr>

                        </tfoot>
                    </table>
                </div>
            </div>)
        } else {

          return (<div className="m-4">
                <h3 className="lg:text-2xl text-xl font-semibold text-gray-700"> APPROVISIONNEMENT</h3>
                <div className=" flex items-center justify-center h-3/4 ">
                  <img className=" h-80 w-auto" src={searchImage} alt="search image" />
                </div>
                <h4 className="lg:text-3xl text-2xl text-gray-700 ">Ouuppss!! cette date n&apos;a pas des donnees</h4>
            </div>);
        }
    } else {
        return (<div className=" justify-center flex">
            <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute"> APPROVISIONNEMENT</h3>
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