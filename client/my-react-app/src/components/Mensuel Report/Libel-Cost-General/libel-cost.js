export function LibelCostTable(props)
{
    
    return (
        <tr>
            {
                <td id = {props.prev.id} name = { `name${props.prev.id}`}> {props.prev.name} </td>
            }

            {
                <td id = {props.prev.id} name = { `amount${props.prev.id}`}> { props.prev.amount} </td>
            }
        </tr>
    )
}