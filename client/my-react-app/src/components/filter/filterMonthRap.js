
export function Filter (props)
{
    return (
        <div>
            <input 
                placeholder="Année" 
                type= "number" 
                name = 'year' 
                value={props.valeur.year}
                onChange = { (e) =>
                {
                    const { name, value } = e.target
                    return props.onchange( name, value)
                }} 
            />

            <input 
                placeholder= "Mois" 
                type= "number" 
                name = 'month' 
                value={props.valeur.month}
                onChange = { (e) =>
                {
                    const { name, value } = e.target
                    return props.onchange( name, value)
                }} 
            />

            <button onClick = {props.onclick}> Search </button>
        </div>
    )
}