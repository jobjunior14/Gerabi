
export function ExcelMain(props)
{
    
    return (
        <tr>
            {props.readonly ? <td> { props.prev.name} </td> :
                <td id = {props.prev.id} name = { `name${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.name}
                        id = { props.prev.id }
                        name = 'name' 
                        type = 'text'
                        placeholder = ' Taper le nom du produit '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev.id, name, value,"", "")
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
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value, } = e.target
                            return props.onchange( props.prev.id, name, value, "qt_caisse", "")
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
                        type = 'number'
                        placeholder = ' Taper la qt des nbr_btll '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev.id, name, value, "nbr_btll", "")
                        }}
                    />

                </td>
            }

            { !props.toggle && <td id = {props.prev.id} name = { `qt_btll${props.prev.id}`}> { props.prev.achat_journalier.qt_btll} </td> }

            {
                <td id = {props.prev.id} name = { `prix_achat_gros${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.achat_journalier.prix_achat_gros}
                        id = { props.prev.id }
                        name = 'achat_journalier'
                        type = 'number'
                        placeholder = ' Taper la qt des prix_achat_gros '
                        onChange = { (e) =>
                        {
                            const { name, value} = e.target
                            return props.onchange( props.prev.id, name, value, "prix_achat_gros", "")
                        }}
                    />

                </td>
            }

            { !props.toggle && <td id = {props.prev.id} name = { `val_gros_approvisionnement${props.prev.id}`}> { props.prev.benefice_sur_achat.val_gros_approvisionnement} </td> }

            { !props.toggle && <td id = {props.prev.id} name = { `val_det${props.prev.id}`}> { props.prev.benefice_sur_achat.val_det} </td> }

            { !props.toggle && <td id = {props.prev.id} name = { `benefice${props.prev.id}`}> { props.prev.benefice_sur_achat.benefice} </td> }

            { !props.toggle && <td id = {props.prev.id} name = { `stock_gen${props.prev.id}`}> { props.prev.business_projection.stock_gen} </td> }
            
            {
                <td id = {props.prev.id} name = { `stock_gen${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.business_projection.sortie_cave}
                        id = { props.prev.id }
                        name = 'business_projection'
                        type = 'number'
                        placeholder = ' Taper la qt des stock_gen '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev.id, name, value, "sortie_cave", "")
                        }}
                    />

                </td>
            }

            { !props.toggle && <td id = {props.prev.id} name = { `stock_gen${props.prev.id}`}> { props.prev.business_projection.stock_dego} </td> }
                   
            { !props.toggle && <td id = {props.prev.id} name = { `val_stock_det${props.prev.id}`}> { props.prev.business_projection.val_stock_det} </td> }

            { !props.toggle && <td id = {props.prev.id} name = { `ref_prix_gros${props.prev.id}`}> { props.prev.business_projection.ref_prix_gros} </td> }

            { !props.toggle && <td id = {props.prev.id} name = { `val_stock_gros${props.prev.id}`}> { props.prev.business_projection.val_stock_gros} </td> }

            { !props.toggle && <td id = {props.prev.id} name = { `business_projection${props.prev.id}`}> { props.prev.business_projection.marge_beneficiaire} </td> }

            {
                <td id = {props.prev.id} name = { `ref_prix_det${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.vente_journaliere.ref_prix_det}
                        id = { props.prev.id }
                        name = 'vente_journaliere'
                        type = 'number'
                        placeholder = ' Taper la qt des ref_prix_det '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev.id, name, value, 'ref_prix_det', "")
                        }}
                    />

                </td>
            }

            { !props.toggle && <td id = {props.prev.id} name = { `qt_vendue_comptoir${props.prev.id}`}> { props.prev.vente_journaliere.qt_vendue_comptoir} </td> }

            { !props.toggle && <td id = {props.prev.id} name = { `valeur${props.prev.id}`}> { props.prev.vente_journaliere.valeur} </td> }

            { !props.toggle && <td id = {props.prev.id} name = { `benefice_sur_vente${props.prev.id}`}>  {props.prev.benefice_sur_vente} </td> }
                
            {
                <td id = {props.prev.id} name = { `qt${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.stock_consignaions.qt}
                        id = { props.prev.id }
                        name = 'stock_consignaions'
                        type = 'number'
                        placeholder = ' Taper la qt des qt '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev.id, name, value, "qt", "")
                        }}
                    />

                </td>
            }

            { !props.toggle && <td id = {props.prev.id} name = { `valeur${props.prev.id}`}> { props.prev.stock_consignaions.valeur} </td> }

            { !props.toggle &&
                <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll}
                        id = { props.prev.id }
                        name = 'val_precedente'
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev.id, name, value, 'stock_apres_ventente_rest_stock_comptoir_qt_btll', '' )
                        }}
                    />
                            
                </td> 
            }

            { !props.toggle &&
                <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll}
                        id = { props.prev.id }
                        name = 'val_precedente'
                        type = 'number'
                        placeholder = ' Taper la qt des caisses '
                        onChange = { (e) =>
                        {
                            const { name, value } = e.target
                            return props.onchange( props.prev.id, name, value, 'stock_apres_ventente_rest_stock_depot_qt_btll', '' )
                        }}
                    />
            
                </td>
            }
            <tr>
                    
                {
                    <td id = {props.prev.id} name = { `qt_btll${props.prev.id}`}>
                        <input 
                            defaultValue = { props.prev.stock_apres_vente.reste_stock_comptoir.qt_btll}
                            id = { props.prev.id }
                            name = 'stock_apres_vente'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                return props.onchange( props.prev.id, name, value, 'reste_stock_comptoir', 'qt_btll' )
                            }}
                        />
                    </td>
                }

                { !props.toggle && <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>  { props.prev.stock_apres_vente.reste_stock_comptoir.valeur} </td> }

                {
                    <td id = {props.prev.id} name = { `valeur${props.prev.id}`}>
                        <input 
                            defaultValue = { props.prev.stock_apres_vente.reste_stock_depot.qt_caisses}
                            id = { props.prev.id }
                            name = 'stock_apres_vente'
                            type = 'number'
                            placeholder = ' Taper la qt des caisses '
                            onChange = { (e) =>
                            {
                                const { name, value } = e.target
                                return props.onchange( props.prev.id, name, value, 'reste_stock_depot', 'qt_caisses' )
                            }}
                        />

                    </td>
                }

                { !props.toggle && <td id = {props.prev.id} name = { `valeur${props.prev.id}`}> { props.prev.stock_apres_vente.reste_stock_depot.qt_btll} </td> }

                { !props.toggle && <td id = {props.prev.id} name = { `valeur${props.prev.id}`}> { props.prev.stock_apres_vente.reste_stock_depot.valeur} </td> }

                { !props.toggle && <td id = {props.prev.id} name = { `valeur${props.prev.id}`}> { props.prev.stock_apres_vente.valeur_stock} </td> }

            </tr>    
           
        </tr>
    )
}