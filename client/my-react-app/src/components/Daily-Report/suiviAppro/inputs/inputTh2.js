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
            
            { props.toggleSuivi >= 4 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 4 && <th style={ tbaleTh}> Valeur  </th>}

            { props.toggleSuivi >= 5 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 5 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 6 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 6 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 7 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 7 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 8 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 8 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 9 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 9 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 10 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 10 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 11 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 11 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 12 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 12 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 13 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 13 && <th style={ tbaleTh}> Valeur  </th>}
            
            { props.toggleSuivi >= 14 && <th style={ tbaleTh}> Qt Caisse  </th>}
            { props.toggleSuivi >= 14 && <th style={ tbaleTh}> Valeur  </th>}
            
        </tr>
    )
}