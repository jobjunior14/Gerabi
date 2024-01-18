/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { mensRapportActions } from "../../store/mensRepport-slice";
import LoadingError from '../../errorPages/LoadingError'
import No_ExistentDate from "../../errorPages/no_existantDate";
import Loading from '../../loading';
export default function VenteBar ({venteDego, loading, error}) {

    const dispatch = useDispatch()
    //data
    const data = useSelector(state => state.mensRapport.suiviVente);

    const thStyle = " py-1 bg-indigo-200 px-12 border-solid font-normal border-2 border-gray-900";
    const tdStyle = "border-2 border-gray-800";
    if (data.bralima && data.brasimba && data.autreProduit ) {

        if ( data.bralima.length > 0 && data.brasimba.length > 0 && data.autreProduit.length > 0 ) {

            const totalVenteSysteme = data.bralima[0].vente_bar + data.brasimba[0].vente_bar + data.autreProduit[0].vente_bar;
            const pertes = totalVenteSysteme - venteDego;
            dispatch(mensRapportActions.setPerte(pertes));

            return (<div className=" justify-center flex"> 

                <h3 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute"> VENTE BAR</h3>
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
                                <td className={tdStyle}> {data.bralima[0].vente_bar}</td>
                            </tr>
                            <tr>
                                <td className={tdStyle}> Brasimba </td>
                                <td className={tdStyle}> {data.brasimba[0].vente_bar}</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className={tdStyle}> Autre Produit </td>
                                <td className={tdStyle}> {data.autreProduit[0].vente_bar}</td>
                            </tr>
                            <tr >
                                <td className={tdStyle}> Total Vente Sytème </td>
                                <td className={tdStyle}> {totalVenteSysteme}</td>
                            </tr>
                            <tr className="bg-green-200">
                                <td className={tdStyle}> Vente Dego </td>
                                <td className={tdStyle}> {venteDego}</td>
                            </tr>
                            <tr className="bg-red-100">
                                <td className={tdStyle}> Pertes </td>
                                <td className={tdStyle}> {pertes}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>)
        } else {
            return (<No_ExistentDate/>)
        }

    } else {

        if (error) {
            return (<LoadingError message={error.message}/>);
        }
        if (loading) {
            return (<Loading/>);
        }
    };

}