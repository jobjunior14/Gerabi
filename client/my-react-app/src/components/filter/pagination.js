
export function Pages(props)
{
    return (
        <div>
            <button onClick={props.onclick}>{props.data}</button>
        </div>
    )
}