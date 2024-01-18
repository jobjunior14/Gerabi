/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import No_ExistentDate from "../../errorPages/no_existantDate";
import LoadingError from "../../errorPages/LoadingError";
import Loading from "../../loading";
export default function Benefice ({depenseEff, error, loading}) {

    //data
    const data = useSelector(state => state.mensRapport.suiviVente);
    const perte = useSelector(state => state.mensRapport.perte);
    
    const thStyle = " py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900";
    const tdStyle = "border-2 border-gray-800";
    if ( data.bralima && data.brasimba && data.autreProduit && data.liqueurs ) {

        if ( data.bralima.length > 0 && data.brasimba.length > 0 && data.autreProduit.length > 0 && data.liqueurs.length > 0 ) {

            const total = data.bralima[0].benefice + data.brasimba[0].benefice + data.autreProduit[0].benefice + data.liqueurs[0].benefice;

            return (<div className=" justify-center flex"> 

                <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute"> BENEFICE </h3>
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
                                <td className={tdStyle}> {data.bralima[0].benefice}</td>
                            </tr>
                            <tr>
                                <td className={tdStyle}> Brasimba </td>
                                <td className={tdStyle}> {data.brasimba[0].benefice}</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className={tdStyle}> Autre Produit </td>
                                <td className={tdStyle}> {data.autreProduit[0].benefice}</td>
                            </tr>
                            <tr>
                                <td className={tdStyle}> Liqueurs </td>
                                <td className={tdStyle}> {data.liqueurs[0].benefice}</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className={tdStyle}> Total </td>
                                <td className={tdStyle}> {total}</td>
                            </tr>
                            <tr>
                                <td className={tdStyle}> _</td>
                                <td className={tdStyle}>_</td>
                            </tr>
                            <tr className="bg-red-100">
                                <td className={tdStyle}> Pertes </td>
                                <td className={tdStyle}> {perte}</td>
                            </tr>
                            <tr>
                                <td className={tdStyle}> Dépenses éffectuées  </td>
                                <td className={tdStyle}> {depenseEff}</td>
                            </tr>
                            <tr className="bg-green-100">
                                <td className={tdStyle}>Benefice net  </td>
                                <td className={tdStyle}> {total - (perte + depenseEff)} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>)
        } else {
          return (<No_ExistentDate/>);
        }
    } else {

        if (error) {
            return (<LoadingError message={error.message}/>);
        }
        
        if (loading) {
            return (<Loading/>);
        }
    }

}