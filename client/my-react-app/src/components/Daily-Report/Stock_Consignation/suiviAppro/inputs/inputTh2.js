import React from "react";
const {tbaleTh} = require ('./css.js');

export default function InputsTh2 (props)
{
    return (
        <tr>
            <th style={ tbaleTh}> Qt Caisse  </th>
            <th style={ tbaleTh}> Valeur </th>
            
            <th style={ tbaleTh}> Qt Caisse  </th>
            <th style={ tbaleTh}> Valeur </th>
            
            <th style={ tbaleTh}> Qt Caisse  </th>
            <th style={ tbaleTh}> Valeur </th>
            
            { props.providers >= 4 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 4 && <th style={ tbaleTh}> Valeur  </th>}

            { props.providers >= 5 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 5 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 6 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 6 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 7 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 7 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 8 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 8 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 9 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 9 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 10 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 10 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 11 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 11 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 12 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 12 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 13 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 13 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.providers >= 14 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.providers >= 14 && <th style={ tbaleTh}> Valeur  </th>}
            
        </tr>
    )
}