
export function ExcelMain(props)
{
    
    return (
        <tr>
            {
                <td id = {props.prev._id} name = { `name${props.prev._id}`}>
                    <input 
                        defaultValue = { props.prev.name}
                        id = { props.prev._id }
                        name = 'name' 
                        type = 'text'
                        placeholder = ' Taper le nom du produit '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value,"", "")
                        }}
                    />
                </td>
            }

            {
                <td id = {props.prev._id} name = { `qt_caisse${props.prev._id}`}>
                    <input 
                        defaultValue = { props.prev.achat_journalier.qt_caisse}
                        id = { props.prev._id }
                        name = 'achat_journalier'
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value, } = e.target
                            return props.onchange( props.prev._id, name, value, "qt_caisse", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `nbr_btll${props.prev._id}`}>
                    <input 
                        defaultValue = { props.prev.achat_journalier.nbr_btll}
                        id = { props.prev._id }
                        name = 'achat_journalier'
                        type = 'number'
                        placeholder = ' Taper la qt des nbr_btll '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "nbr_btll", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `qt_btll${props.prev._id}`}>
                    <input 
                        value = { props.prev.achat_journalier.qt_btll}
                        id = { props.prev._id }
                        name = 'achat_journalier'
                        type = 'number'
                        placeholder = ' Taper la qt des qt_btll '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "qt_btll", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `prix_achat_gros${props.prev._id}`}>
                    <input 
                        defaultValue = { props.prev.achat_journalier.prix_achat_gros}
                        id = { props.prev._id }
                        name = 'achat_journalier'
                        type = 'number'
                        p
                        laceholder = ' Taper la qt des prix_achat_gros '
                        onChange = { (e) =>
                        {
                            const { name, value} = e.target
                            return props.onchange( props.prev._id, name, value, "prix_achat_gros", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `val_gros_approvisionnement${props.prev._id}`}>
                    <input 
                        value = { props.prev.benefice_sur_achat.val_gros_approvisionnement}
                        id = { props.prev._id }
                        name = 'benefice_sur_achat'
                        type = 'number'
                        placeholder = ' Taper la qt des val_gros_approvisionnement '
                        onChange = { (e) =>
                        {
                            const { name, value} = e.target
                            return props.onchange( props.prev._id, name, value, "val_gros_approvisionnement", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `val_det${props.prev._id}`}>
                    <input 
                        value = { props.prev.benefice_sur_achat.val_det}
                        id = { props.prev._id }
                        name = 'benefice_sur_achat'
                        type = 'number'
                        placeholder = ' Taper la qt des val_det '
                        onChange = { (e) =>
                        {
                            const { name, value} = e.target
                            return props.onchange( props.prev._id, name, value, "val_det", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `benefice${props.prev._id}`}>
                    <input 
                        value = { props.prev.benefice_sur_achat.benefice}
                        id = { props.prev._id }
                        name = 'benefice_sur_achat'
                        type = 'number'
                        placeholder = ' Taper la qt des benefice '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "benefice", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `stock_gen${props.prev._id}`}>
                    <input 
                        value = { props.prev.business_projection.stock_gen}
                        id = { props.prev._id }
                        name = 'business_projection'
                        type = 'number'
                        placeholder = ' Taper la qt des stock_gen '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "stock_gen", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `stock_gen${props.prev._id}`}>
                    <input 
                        defaultValue = { props.prev.business_projection.sortie_cave}
                        id = { props.prev._id }
                        name = 'business_projection'
                        type = 'number'
                        placeholder = ' Taper la qt des stock_gen '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "sortie_cave", "")
                        }}
                    />

                </td>
            }

            {
                <td id = {props.prev._id} name = { `stock_gen${props.prev._id}`}>
                    <input 
                        value = { props.prev.business_projection.stock_dego}
                        id = { props.prev._id }
                        name = 'business_projection'
                        type = 'number'
                        placeholder = ' Taper la qt des stock_gen '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value,"stock_dego", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `val_stock_det${props.prev._id}`}>
                    <input 
                        value = { props.prev.business_projection.val_stock_det}
                        id = { props.prev._id }
                        name = 'business_projection'
                        type = 'number'
                        placeholder = ' Taper la qt des val_stock_det '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value,"val_stock_det", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `ref_prix_gros${props.prev._id}`}>
                    <input 
                        value = { props.prev.business_projection.ref_prix_gros}
                        id = { props.prev._id }
                        name = 'business_projection'
                        type = 'number'
                        placeholder = ' Taper la qt des ref_prix_gros '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value,"ref_prix_gros", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `val_stock_gros${props.prev._id}`}>
                    <input 
                        value = { props.prev.business_projection.ref_prix_gros}
                        id = { props.prev._id }
                        name = 'business_projection'
                        type = 'number'
                        placeholder = ' Taper la qt des ref_prix_gros '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "val_stock_gros", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `business_projection${props.prev._id}`}>
                    <input 
                        value = { props.prev.business_projection.marge_beneficiaire}
                        id = { props.prev._id }
                        name = 'business_projection'
                        type = 'number'
                        placeholder = ' Taper la qt des marge_beneficiaire '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value,"marge_beneficiaire", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `ref_prix_det${props.prev._id}`}>
                    <input 
                        defaultValue = { props.prev.vente_journaliere.ref_prix_det}
                        id = { props.prev._id }
                        name = 'vente_journaliere'
                        type = 'number'
                        placeholder = ' Taper la qt des ref_prix_det '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, 'ref_prix_det', "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `qt_vendue_comptoir${props.prev._id}`}>
                    <input 
                        value = { props.prev.vente_journaliere.qt_vendue_comptoir}
                        id = { props.prev._id }
                        name = 'vente_journaliere'
                        type = 'number'
                        placeholder = ' Taper la qt des qt_vendue_comptoir '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value,"qt_vendue_comptoir", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `valeur${props.prev._id}`}>
                    <input 
                        value = { props.prev.vente_journaliere.valeur}
                        id = { props.prev._id }
                        name = 'vente_journaliere'
                        type = 'number'
                        placeholder = ' Taper la qt des valeur '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value,"valeur", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `benefice_sur_vente${props.prev._id}`}>
                    <input 
                        value = { props.prev.benefice_sur_vente}
                        id = { props.prev._id }
                        name = 'benefice_sur_vente'
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value, type } = e.target
                            return props.onchange( props.prev._id, name, value, "", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `qt${props.prev._id}`}>
                    <input 
                        defaultValue = { props.prev.stock_consignaions.qt}
                        id = { props.prev._id }
                        name = 'stock_consignaions'
                        type = 'number'
                        placeholder = ' Taper la qt des qt '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "qt", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev._id} name = { `valeur${props.prev._id}`}>
                    <input 
                        value = { props.prev.stock_consignaions.valeur}
                        id = { props.prev._id }
                        name = 'stock_consignaions'
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "valeur", "")
                        }}
                    />

                </td>
            }
            
            

                    <tr>
                        <>
                        {
                        <td id = {props.prev._id} name = { `qt_btll${props.prev._id}`}>
                            <input 
                                defaultValue = { props.prev.stock_apres_vente.reste_stock_comptoir.qt_btll}
                                id = { props.prev._id }
                                name = 'stock_apres_vente'
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value } = e.target
                                    return props.onchange( props.prev._id, name, value, 'reste_stock_comptoir', 'qt_btll' )
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev._id} name = { `valeur${props.prev._id}`}>
                            <input 
                                value = { props.prev.stock_apres_vente.reste_stock_comptoir.valeur}
                                id = { props.prev._id }
                                name = 'stock_apres_vente'
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value } = e.target
                                    return props.onchange( props.prev._id, name, value, 'reste_stock_comptoir', 'valeur' )
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev._id} name = { `valeur${props.prev._id}`}>
                            <input 
                                defaultValue = { props.prev.stock_apres_vente.reste_stock_depot.qt_caisses}
                                id = { props.prev._id }
                                name = 'stock_apres_vente'
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value } = e.target
                                    return props.onchange( props.prev._id, name, value, 'reste_stock_depot', 'qt_caisses' )
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev._id} name = { `valeur${props.prev._id}`}>
                            <input 
                                value = { props.prev.stock_apres_vente.reste_stock_depot.qt_btll}
                                id = { props.prev._id }
                                name = 'stock_apres_vente'
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value } = e.target
                                    return props.onchange( props.prev._id, name, value, 'reste_stock_depot', 'qt_btll' )
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev._id} name = { `valeur${props.prev._id}`}>
                            <input 
                                value = { props.prev.stock_apres_vente.reste_stock_depot.valeur}
                                id = { props.prev._id }
                                name = 'stock_apres_vente'
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value } = e.target
                                    return props.onchange( props.prev._id, name, value, 'reste_stock_depot', 'valeur')
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev._id} name = { `valeur${props.prev._id}`}>
                            <input 
                                value = { props.prev.stock_apres_vente.valeur_stock}
                                id = { props.prev._id }
                                name = 'stock_apres_vente'
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value } = e.target
                                    return props.onchange( props.prev._id, name, value, "valeur_stock", "")
                                }}
                            />

                        </td>
                    }
                        </>
                    </tr>
                    
            
            {/* {
                <td id = {props.prev._id} name = { `valeur${props.prev._id}`}>
                    <input 
                        defaultValue = { props.prev.stock_apres_vente.valeur_stock}
                        id = { props.prev._id }
                        name = 'stock_apres_vente'
                        modvalue = "valeur_stock"
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev._id, name, value, "")
                        }}
                    />

                </td>
            } */}
   


            {/* {
                <td id = {props.prev._id} name = { `check${props.prev._id}`}>
                    <input 
                        id = { props.prev._id }
                        name = 'check'
                        checked = { props.prev.check }
                        type = 'checkbox'
                        onChange = { (e) =>
                        {
                            const { name, type, checked} = e.target
                            return props.onchange( props.prev._id, name,'', type, checked)
                        }}
                    />

                </td>
            } */}
        </tr>
    )
}