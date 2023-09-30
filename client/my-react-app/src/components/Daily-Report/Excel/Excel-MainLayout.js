
export function ExcelMain(props)
{
    
    return (
        <tr>
            {
                <td id = {props.prev.id} name = { `name${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.name}
                        id = { props.prev.id }
                        name = 'name' 
                        type = 'text'
                        placeholder = ' Taper le nom du produit '
                        onChange = { (e) =>
                        {
                            const { name, value, type } = e.target
                            return props.onchange( props.prev.id, name, value, type,"", "")
                        }}
                    />
                </td>
            }

            {
                <td id = {props.prev.id} name = { `qt_caisse${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.achat_journalier.qt_caisse}
                        id = { props.prev.id }
                        name = 'achat_journalier'
                        modvalue = "qt_caisse"
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `nbr_btll${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.achat_journalier.nbr_btll}
                        id = { props.prev.id }
                        name = 'achat_journalier'
                        modvalue = "nbr_btll"
                        type = 'number'
                        placeholder = ' Taper la qt des nbr_btll '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `qt_btll${props.prev.id}`}>
                    <input 
                        value = { props.prev.achat_journalier.qt_btll}
                        id = { props.prev.id }
                        name = 'achat_journalier'
                        modvalue = "qt_btll"
                        type = 'number'
                        placeholder = ' Taper la qt des qt_btll '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `prix_achat_gros${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.achat_journalier.prix_achat_gros}
                        id = { props.prev.id }
                        name = 'achat_journalier'
                        modvalue = 'prix_achat_gros'
                        type = 'number'
                        placeholder = ' Taper la qt des prix_achat_gros '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `val_gros_approvisionnement${props.prev.id}`}>
                    <input 
                        value = { props.prev.benefice_sur_achat.val_gros_approvisionnement}
                        id = { props.prev.id }
                        name = 'benefice_sur_achat'
                        modvalue = 'val_gros_approvisionnement'
                        type = 'number'
                        placeholder = ' Taper la qt des val_gros_approvisionnement '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `val_det${props.prev.id}`}>
                    <input 
                        value = { props.prev.benefice_sur_achat.val_det}
                        id = { props.prev.id }
                        name = 'benefice_sur_achat'
                        modvalue = 'val_det'
                        type = 'number'
                        placeholder = ' Taper la qt des val_det '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `benefice${props.prev.id}`}>
                    <input 
                        value = { props.prev.benefice_sur_achat.benefice}
                        id = { props.prev.id }
                        name = 'benefice_sur_achat'
                        modvalue = 'benefice'
                        type = 'number'
                        placeholder = ' Taper la qt des benefice '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `stock_gen${props.prev.id}`}>
                    <input 
                        value = { props.prev.business_projection.stock_gen}
                        id = { props.prev.id }
                        name = 'business_projection'
                        modvalue = 'stock_gen'
                        type = 'number'
                        placeholder = ' Taper la qt des stock_gen '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `stock_gen${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.business_projection.sortie_cave}
                        id = { props.prev.id }
                        name = 'business_projection'
                        modvalue = 'sortie_cave'
                        type = 'number'
                        placeholder = ' Taper la qt des stock_gen '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }

            {
                <td id = {props.prev.id} name = { `stock_gen${props.prev.id}`}>
                    <input 
                        value = { props.prev.business_projection.stock_dego}
                        id = { props.prev.id }
                        name = 'business_projection'
                        modvalue = 'stock_dego'
                        type = 'number'
                        placeholder = ' Taper la qt des stock_gen '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `val_stock_det${props.prev.id}`}>
                    <input 
                        value = { props.prev.business_projection.val_stock_det}
                        id = { props.prev.id }
                        name = 'business_projection'
                        modvalue = 'val_stock_det'
                        type = 'number'
                        placeholder = ' Taper la qt des val_stock_det '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `ref_prix_gros${props.prev.id}`}>
                    <input 
                        value = { props.prev.business_projection.ref_prix_gros}
                        id = { props.prev.id }
                        name = 'business_projection'
                        modvalue = 'ref_prix_gros'
                        type = 'number'
                        placeholder = ' Taper la qt des ref_prix_gros '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `val_stock_gros${props.prev.id}`}>
                    <input 
                        value = { props.prev.business_projection.ref_prix_gros}
                        id = { props.prev.id }
                        name = 'business_projection'
                        modvalue = 'val_stock_gros'
                        type = 'number'
                        placeholder = ' Taper la qt des ref_prix_gros '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `business_projection${props.prev.id}`}>
                    <input 
                        value = { props.prev.business_projection.marge_beneficiaire}
                        id = { props.prev.id }
                        name = 'business_projection'
                        modvalue = 'marge_beneficiaire'
                        type = 'number'
                        placeholder = ' Taper la qt des marge_beneficiaire '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `ref_prix_det${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.vente_journaliere.ref_prix_det}
                        id = { props.prev.id }
                        name = 'vente_journaliere'
                        modvalue = 'ref_prix_det'
                        type = 'number'
                        placeholder = ' Taper la qt des ref_prix_det '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `qt_vendue_comptoir${props.prev.id}`}>
                    <input 
                        value = { props.prev.vente_journaliere.qt_vendue_comptoir}
                        id = { props.prev.id }
                        name = 'vente_journaliere'
                        modvalue = 'qt_vendue_comptoir'
                        type = 'number'
                        placeholder = ' Taper la qt des qt_vendue_comptoir '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                    <input 
                        value = { props.prev.vente_journaliere.valeur}
                        id = { props.prev.id }
                        name = 'vente_journaliere'
                        modvalue = 'valeur'
                        type = 'number'
                        placeholder = ' Taper la qt des valeur '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `benefice_sur_vente${props.prev.id}`}>
                    <input 
                        value = { props.prev.benefice_sur_vente}
                        id = { props.prev.id }
                        name = 'benefice_sur_vente'
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value, type } = e.target
                            return props.onchange( props.prev.id, name, value, type, "", "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `qt${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.stock_consignaions.qt}
                        id = { props.prev.id }
                        name = 'stock_consignaions'
                        modvalue = "qt"
                        type = 'number'
                        placeholder = ' Taper la qt des qt '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            {
                <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                    <input 
                        value = { props.prev.stock_consignaions.valeur}
                        id = { props.prev.id }
                        name = 'stock_consignaions'
                        modvalue = "valeur"
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            }
            
            

                    <tr>
                        <>
                        {
                        <td id = {props.prev.id} name = { `qt_btll${props.prev.id}`}>
                            <input 
                                defaultValue = { props.prev.stock_apres_vente.reste_stock_comptoir.qt_btll}
                                id = { props.prev.id }
                                name = 'stock_apres_vente'
                                objectvalue = "reste_stock_comptoir"
                                modvalue = "qt_btll"
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value, type,modvalue, objectvalue } = e.target
                                    return props.onchange( props.prev.id, name, value, type, modvalue, objectvalue)
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                            <input 
                                value = { props.prev.stock_apres_vente.reste_stock_comptoir.valeur}
                                id = { props.prev.id }
                                name = 'stock_apres_vente'
                                objectvalue = "reste_stock_comptoir"
                                modvalue = "valeur"
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value, type,modvalue, objectvalue } = e.target
                                    return props.onchange( props.prev.id, name, value, type, modvalue, objectvalue)
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                            <input 
                                defaultValue = { props.prev.stock_apres_vente.reste_stock_depot.qt_caisses}
                                id = { props.prev.id }
                                name = 'stock_apres_vente'
                                objectvalue = "reste_stock_depot"
                                modvalue = "qt_caisses"
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value, type, modvalue, objectvalue } = e.target
                                    return props.onchange( props.prev.id, name, value, type, modvalue, objectvalue)
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                            <input 
                                value = { props.prev.stock_apres_vente.reste_stock_depot.qt_btll}
                                id = { props.prev.id }
                                name = 'stock_apres_vente'
                                objectvalue = "reste_stock_depot"
                                modvalue = "qt_btll"
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value, type,modvalue, objectvalue } = e.target
                                    return props.onchange( props.prev.id, name, value, type,modvalue, objectvalue)
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                            <input 
                                value = { props.prev.stock_apres_vente.reste_stock_depot.valeur}
                                id = { props.prev.id }
                                name = 'stock_apres_vente'
                                objectvalue = "reste_stock_depot"
                                modvalue = "valeur"
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value, type, modvalue, objectvalue } = e.target
                                    return props.onchange( props.prev.id, name, value, type, modvalue, objectvalue)
                                }}
                            />

                        </td>
                    }
                    {
                        <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                            <input 
                                value = { props.prev.stock_apres_vente.valeur_stock}
                                id = { props.prev.id }
                                name = 'stock_apres_vente'
                                modvalue = "valeur_stock"
                                type = 'number'
                                placeholder = ' Taper la qt des caisses '
                                onChange = { (e) =>
                                {
                                    const { name, value, type, modvalue } = e.target
                                    return props.onchange( props.prev.id, name, value, type, modvalue, "")
                                }}
                            />

                        </td>
                    }
                        </>
                    </tr>
                    
            
            {/* {
                <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.stock_apres_vente.valeur_stock}
                        id = { props.prev.id }
                        name = 'stock_apres_vente'
                        modvalue = "valeur_stock"
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value, type, modvalue } = e.target
                            return props.onchange( props.prev.id, name, value, type, modvalue, "")
                        }}
                    />

                </td>
            } */}
   


            {/* {
                <td id = {props.prev.id} name = { `check${props.prev.id}`}>
                    <input 
                        id = { props.prev.id }
                        name = 'check'
                        checked = { props.prev.check }
                        type = 'checkbox'
                        onChange = { (e) =>
                        {
                            const { name, type, checked} = e.target
                            return props.onchange( props.prev.id, name,'', type, checked)
                        }}
                    />

                </td>
            } */}
        </tr>
    )
}