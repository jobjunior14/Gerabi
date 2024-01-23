/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../store/AllProductManager-slice";
import { alimProductActions } from "../../../store/AllProductManagerAlim-slice";
import { useId } from "react";
import useParamsGetter from "../../../reuseFunction/paramsGetter";
export function ExcelMain(props)
{
    //****************************take attention to the props parameter *******************/
    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {stateAction} = useParamsGetter();
    const readOnly = useSelector (state => stateAction ? state.product.readOnly : state.alimProduct.readOnly);
    const toggleStoc = useSelector (state => stateAction ? state.product.toggleStoc : state.alimProduct.toggleStoc);
    const dispatch = useDispatch();
    const id = useId();
    
    const inputStyle = "w-28 bg-gray-50 dark:text-gray-50 dark:bg-gray-800 rounded-md  duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 ";
    if (stateAction) {
        
        return (
            <tr>
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50" id = {props.prev.id} name = { `name${props.prev.id}`}>
                        <input
                            className="w-32 bg-gray-50 dark:text-gray-50 dark:bg-gray-800 rounded-md duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
                            value = { props.prev.name}
                            id = { props.prev.id + id + 'name' }
                            name = 'name' 
                            readOnly = {readOnly}
                            type = 'text'
                            placeholder = ' Taper le nom du produit '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(productActions.handleFormInStock (  {id: props.prev.id, name: name, value: value, modvalue: "", objectvalue: ""}));
                            }}
                        />
                    </td>
                }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.achat_journalier.qt_caisse}
                            id = { props.prev.id + id + 'achat_journalier_qtCaisse' }
                            name = 'achat_journalier'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value, } = e.target
                                dispatch(productActions.handleFormInStock ({id: props.prev.id, name: name, value: value, modvalue: "qt_caisse", objectvalue: "" }));
                            }}
                        />
    
                    </td>
                }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle}
                            value = { props.prev.achat_journalier.nbr_btll}
                            id = { props.prev.id + id + 'achat_journalierNbr_Btll' }
                            name = 'achat_journalier'
                            type = 'number'
                            placeholder = ' Taper la qt des nbr_btll '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(productActions.handleFormInStock ( {id: props.prev.id,name: name, value: value, modvalue: "nbr_btll", objectvalue: ""}));
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.achat_journalier.qt_btll} </td> }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.achat_journalier.prix_achat_gros}
                            id = { props.prev.id + id + "achat_journalierAchatGros" }
                            name = 'achat_journalier'
                            type = 'number'
                            placeholder = ' Taper la qt des prix_achat_gros '
                            onChange = { (e) =>
                            {
                                const { name, value} = e.target
                                dispatch(productActions.handleFormInStock ( {id: props.prev.id, name: name, value: value, modvalue: "prix_achat_gros", objectvalue: ""} ))
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.benefice_sur_achat.val_gros_approvisionnement} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.benefice_sur_achat.val_det} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.benefice_sur_achat.benefice} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.stock_gen} </td> }
                
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.business_projection.sortie_cave}
                            id = { props.prev.id + id + "business_projectionSortieCave"}
                            name = 'business_projection'
                            type = 'number'
                            placeholder = ' Taper la qt des stock_gen '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(productActions.handleFormInStock ({id: props.prev.id, name: name, value: value, modvalue: "sortie_cave", objectvalue: ""} ));
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.stock_dego} </td> }
                       
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.val_stock_det} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.ref_prix_gros} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.val_stock_gros} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.marge_beneficiaire} </td> }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.vente_journaliere.ref_prix_det}
                            id = { props.prev.id + id + 'vente_journalierePrixdet'}
                            name = 'vente_journaliere'
                            type = 'number'
                            placeholder = ' Taper la qt des ref_prix_det '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(productActions.handleFormInStock ({ id: props.prev.id, name: name, value: value, modvalue: 'ref_prix_det', objectvalue: ""} ));
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.vente_journaliere.qt_vendue_comptoir} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.vente_journaliere.valeur} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50">  {props.prev.benefice_sur_vente} </td> }
                    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.stock_consignaions.qt}
                            id = { props.prev.id + id + "stock_consignaionsQt"}
                            name = 'stock_consignaions'
                            type = 'number'
                            placeholder = ' Taper la qt des qt '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(productActions.handleFormInStock ( {id: props.prev.id, name: name, value: value, modvalue: "qt",objectvalue: ""} ));
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.stock_consignaions.valeur} </td> }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll}
                            id = { props.prev.id + id + 'val_precedentestock_apres_ventente_rest_stock_comptoir_qt_btll' }
                            name = 'val_precedente'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(productActions.handleFormInStock ({ id: props.prev.id, name: name, value: value, modvalue: 'stock_apres_ventente_rest_stock_comptoir_qt_btll', objectvalue: ''} ));
                            }}
                        />
                                
                    </td> 
                }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll}
                            id = { props.prev.id + id + "val_precedentestock_apres_ventente_rest_stock_depot_qt_btll"}
                            name = 'val_precedente'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(productActions.handleFormInStock ( { id: props.prev.id, name: name, value: value, modvalue: 'stock_apres_ventente_rest_stock_depot_qt_btll', objectvalue: ''} ))
                            }}
                        />
                
                    </td>
                }
                <tr>
                        
                    {
                        <td className="border-2 border-gray-800 dark:text-gray-50" >
                            <input
                                className={inputStyle} 
                                value = { props.prev.stock_apres_vente.reste_stock_comptoir.qt_btll}
                                id = { props.prev.id + id + 'stock_apres_ventereste_stock_comptoirqt_btll'}
                                name = 'stock_apres_vente'
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value } = e.target
                                    dispatch(productActions.handleFormInStock ( { id: props.prev.id, name: name, value: value, modvalue: 'reste_stock_comptoir', objectvalue: 'qt_btll'}));
                                }}
                            />
                        </td>
                    }
    
                    { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50">  { props.prev.stock_apres_vente.reste_stock_comptoir.valeur} </td> }
    
                    {
                        <td className="border-2 border-gray-800 dark:text-gray-50">
                            <input
                                className={inputStyle} 
                                value = { props.prev.stock_apres_vente.reste_stock_depot.qt_caisses}
                                id = { props.prev.id + id + "stock_apres_ventereste_stock_depotqt_caisses"}
                                name = 'stock_apres_vente'
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value } = e.target
                                    dispatch(productActions.handleFormInStock ( { id: props.prev.id, name: name, value: value, modvalue: 'reste_stock_depot', objectvalue: 'qt_caisses'}));
                                }}
                            />
    
                        </td>
                    }
    
                    { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.stock_apres_vente.reste_stock_depot.qt_btll} </td> }
    
                    { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.stock_apres_vente.reste_stock_depot.valeur} </td> }
    
                    { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.stock_apres_vente.valeur_stock} </td> }
    
                </tr>    
               
            </tr>
        );
    } else {

        return (
            <tr>
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50" id = {props.prev.id} name = { `name${props.prev.id}`}>
                        <input
                            className={inputStyle} 
                            value = { props.prev.name}
                            id = { props.prev.id + id + 'name' }
                            name = 'name' 
                            readOnly = {readOnly}
                            type = 'text'
                            placeholder = ' Taper le nom du produit '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(alimProductActions.handleFormInStock (  {id: props.prev.id, name: name, value: value, modvalue: "", objectvalue: ""}));
                            }}
                        />
                    </td>
                }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.achat_journalier.qt_caisse}
                            id = { props.prev.id + id + 'prev.achat_journalier.qt_caisse' }
                            name = 'achat_journalier'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value, } = e.target
                                dispatch(alimProductActions.handleFormInStock ({id: props.prev.id, name: name, value: value, modvalue: "qt_caisse", objectvalue: "" }));
                            }}
                        />
    
                    </td>
                }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.achat_journalier.nbr_btll}
                            id = { props.prev.id + id + 'achat_journalier.nbr_btll'}
                            name = 'achat_journalier'
                            type = 'number'
                            placeholder = ' Taper la qt des nbr_btll '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(alimProductActions.handleFormInStock ( {id: props.prev.id,name: name, value: value, modvalue: "nbr_btll", objectvalue: ""}));
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.achat_journalier.qt_btll} </td> }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.achat_journalier.prix_achat_gros}
                            id = { props.prev.id + id + 'achat_journalier.prix_achat_gros' }
                            name = 'achat_journalier'
                            type = 'number'
                            placeholder = ' Taper la qt des prix_achat_gros '
                            onChange = { (e) =>
                            {
                                const { name, value} = e.target
                                dispatch(alimProductActions.handleFormInStock ( {id: props.prev.id, name: name, value: value, modvalue: "prix_achat_gros", objectvalue: ""} ))
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.benefice_sur_achat.val_gros_approvisionnement} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.benefice_sur_achat.val_det} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.benefice_sur_achat.benefice} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.stock_gen} </td> }
                
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.business_projection.sortie_dego}
                            id = { props.prev.id + id + 'business_projection.sortie_dego' }
                            name = 'business_projection'
                            type = 'number'
                            placeholder = ' Taper la qt des stock_gen '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(alimProductActions.handleFormInStock ({id: props.prev.id, name: name, value: value, modvalue: "sortie_cave", objectvalue: ""} ));
                            }}
                        />
    
                    </td>
                }
                           
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.stock_cave} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.val_stock_det} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.ref_prix_gros} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.val_stock_gros} </td> }

                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.business_projection.marge_beneficiaire} </td> }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.vente_journaliere.ref_prix_det}
                            id = { props.prev.id + id + 'vente_journaliere.ref_prix_det' }
                            name = 'vente_journaliere'
                            type = 'number'
                            placeholder = ' Taper la qt des ref_prix_det '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(alimProductActions.handleFormInStock ({ id: props.prev.id, name: name, value: value, modvalue: 'ref_prix_det', objectvalue: ""} ));
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.vente_journaliere.qt_vendue} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.vente_journaliere.valeur} </td> }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50">  {props.prev.benefice_sur_vente} </td> }
                    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.stock_consignaions.qt}
                            id = { props.prev.id + id + 'stock_consignaions.qt'}
                            name = 'stock_consignaions'
                            type = 'number'
                            placeholder = ' Taper la qt des qt '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(alimProductActions.handleFormInStock ( {id: props.prev.id, name: name, value: value, modvalue: "qt",objectvalue: ""} ));
                            }}
                        />
    
                    </td>
                }
    
                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50"> { props.prev.stock_consignaions.valeur} </td> }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll}
                            id = { props.prev.id + id + 'val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll'}
                            name = 'val_precedente'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(alimProductActions.handleFormInStock ({ id: props.prev.id, name: name, value: value, modvalue: 'stock_apres_ventente_rest_stock_comptoir_qt_btll', objectvalue: ''} ));
                            }}
                        />
                                
                    </td> 
                }
    
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50">
                        <input
                            className={inputStyle} 
                            value = { props.prev.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll}
                            id = { props.prev.id + id + 'val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll'}
                            name = 'val_precedente'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(alimProductActions.handleFormInStock ( { id: props.prev.id, name: name, value: value, modvalue: 'stock_apres_ventente_rest_stock_depot_qt_btll', objectvalue: ''} ))
                            }}
                        />
                
                    </td>
                }
                        
                {
                    <td className="border-2 border-gray-800 dark:text-gray-50" >
                        <input
                            className={inputStyle} 
                            value = { props.prev.stock_apres_vente.reste_stock}
                            id = { props.prev.id + id + 'stock_apres_vente.reste_stock'}
                            name = 'stock_apres_vente'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                dispatch(alimProductActions.handleFormInStock ( { id: props.prev.id, name: name, value: value, modvalue: 'reste_stock', objectvalue: ''}));
                            }}
                        />
                    </td>
                }

                { !toggleStoc && <td className="border-2 border-gray-800 dark:text-gray-50">  { props.prev.stock_apres_vente.valeur} </td> } 
            </tr>
        );
    }
}