import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../../store/AllProductManager-slice";
import { alimProductActions } from "../../../../store/AllProductManagerAlim-slice";

export function ExcelMain(props)
{
    const readOnlyDego = useSelector (state => state.product.readOnly);
    const readOnlyAlim = useSelector (state => state.alimProduct.readOnly);
    const toggleStoc = useSelector (state => state.product.toggleStoc);
    const stateAction = useSelector (state => state.stateComp.stateComp);
    const dispatch = useDispatch();
    
    if (stateAction) {
        
        return (
            <tr>
                {
                    <td id = {props.prev.id} name = { `name${props.prev.id}`}>
                        <input 
                            defaultValue = { props.prev.name}
                            id = { props.prev.id }
                            name = 'name' 
                            readOnly = {readOnlyDego}
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
                    <td>
                        <input 
                            defaultValue = { props.prev.achat_journalier.qt_caisse}
                            id = { props.prev.id }
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
                    <td>
                        <input 
                            defaultValue = { props.prev.achat_journalier.nbr_btll}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.achat_journalier.qt_btll} </td> }
    
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.achat_journalier.prix_achat_gros}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.benefice_sur_achat.val_gros_approvisionnement} </td> }
    
                { !toggleStoc && <td> { props.prev.benefice_sur_achat.val_det} </td> }
    
                { !toggleStoc && <td> { props.prev.benefice_sur_achat.benefice} </td> }
    
                { !toggleStoc && <td> { props.prev.business_projection.stock_gen} </td> }
                
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.business_projection.sortie_cave}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.business_projection.stock_dego} </td> }

                { !toggleStoc && <td> { props.prev.business_projection.stock_gen} </td> }
                       
                { !toggleStoc && <td> { props.prev.business_projection.val_stock_det} </td> }
    
                { !toggleStoc && <td> { props.prev.business_projection.ref_prix_gros} </td> }
    
                { !toggleStoc && <td> { props.prev.business_projection.val_stock_gros} </td> }
    
                { !toggleStoc && <td> { props.prev.business_projection.marge_beneficiaire} </td> }
    
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.vente_journaliere.ref_prix_det}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.vente_journaliere.qt_vendue_comptoir} </td> }
    
                { !toggleStoc && <td> { props.prev.vente_journaliere.valeur} </td> }
    
                { !toggleStoc && <td>  {props.prev.benefice_sur_vente} </td> }
                    
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.stock_consignaions.qt}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.stock_consignaions.valeur} </td> }
    
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll}
                            id = { props.prev.id }
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
                    <td>
                        <input 
                            defaultValue = { props.prev.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll}
                            id = { props.prev.id }
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
                        <td >
                            <input 
                                defaultValue = { props.prev.stock_apres_vente.reste_stock_comptoir.qt_btll}
                                id = { props.prev.id }
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
    
                    { !toggleStoc && <td>  { props.prev.stock_apres_vente.reste_stock_comptoir.valeur} </td> }
    
                    {
                        <td>
                            <input 
                                defaultValue = { props.prev.stock_apres_vente.reste_stock_depot.qt_caisses}
                                id = { props.prev.id }
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
    
                    { !toggleStoc && <td> { props.prev.stock_apres_vente.reste_stock_depot.qt_btll} </td> }
    
                    { !toggleStoc && <td> { props.prev.stock_apres_vente.reste_stock_depot.valeur} </td> }
    
                    { !toggleStoc && <td> { props.prev.stock_apres_vente.valeur_stock} </td> }
    
                </tr>    
               
            </tr>
        );
    } else {

        return (
            <tr>
                {
                    <td id = {props.prev.id} name = { `name${props.prev.id}`}>
                        <input 
                            defaultValue = { props.prev.name}
                            id = { props.prev.id }
                            name = 'name' 
                            readOnly = {readOnlyAlim}
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
                    <td>
                        <input 
                            defaultValue = { props.prev.achat_journalier.qt_caisse}
                            id = { props.prev.id }
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
                    <td>
                        <input 
                            defaultValue = { props.prev.achat_journalier.nbr_btll}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.achat_journalier.qt_btll} </td> }
    
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.achat_journalier.prix_achat_gros}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.benefice_sur_achat.val_gros_approvisionnement} </td> }
    
                { !toggleStoc && <td> { props.prev.benefice_sur_achat.val_det} </td> }
    
                { !toggleStoc && <td> { props.prev.benefice_sur_achat.benefice} </td> }
    
                { !toggleStoc && <td> { props.prev.business_projection.stock_gen} </td> }
                
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.business_projection.sortie_dego}
                            id = { props.prev.id }
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
                           
                { !toggleStoc && <td> { props.prev.business_projection.stock_cave} </td> }
    
                { !toggleStoc && <td> { props.prev.business_projection.val_stock_det} </td> }
    
                { !toggleStoc && <td> { props.prev.business_projection.ref_prix_gros} </td> }
    
                { !toggleStoc && <td> { props.prev.business_projection.val_stock_gros} </td> }

                { !toggleStoc && <td> { props.prev.business_projection.marge_beneficiaire} </td> }
    
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.vente_journaliere.ref_prix_det}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.vente_journaliere.qt_vendue_comptoir} </td> }
    
                { !toggleStoc && <td> { props.prev.vente_journaliere.valeur} </td> }
    
                { !toggleStoc && <td>  {props.prev.benefice_sur_vente} </td> }
                    
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.stock_consignaions.qt}
                            id = { props.prev.id }
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
    
                { !toggleStoc && <td> { props.prev.stock_consignaions.valeur} </td> }
    
                {
                    <td>
                        <input 
                            defaultValue = { props.prev.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll}
                            id = { props.prev.id }
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
                    <td>
                        <input 
                            defaultValue = { props.prev.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll}
                            id = { props.prev.id }
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
                    <td >
                        <input 
                            defaultValue = { props.prev.stock_apres_vente.reste_stock}
                            id = { props.prev.id }
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

                { !toggleStoc && <td>  { props.prev.stock_apres_vente.valeur} </td> } 
            </tr>
        );
    };
};