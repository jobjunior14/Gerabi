export function LibelCostTable(props)
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
                        placeholder = ' Taper le libellé '
                        onChange = { (e) =>
                        {
                            const { name, value, type } = e.target
                            return props.onchange( props.prev.id, name, value, type)
                        }}
                    />

                </td>
            }

            {
                <td id = {props.prev.id} name = { `amount${props.prev.id}`}>
                    <input 
                        defaultValue = { props.prev.amount}
                        id = { props.prev.id }
                        name = 'amount'
                        type = 'number'
                        placeholder = ' Taper le montant '
                        onChange = { (e) =>
                        {
                            const { name, value, type } = e.target
                            return props.onchange( props.prev.id, name, value, type)
                        }}
                    />

                </td>
            }

            {
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
            }
        </tr>
    )
}