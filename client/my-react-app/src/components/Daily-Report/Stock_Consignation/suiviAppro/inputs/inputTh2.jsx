import React from "react";
import {tbaleTh} from './css';

export default function InputsTh2 ({providers})
{
    return (
        <tr>
            <th style={ tbaleTh}> Qt Caisse  </th>
            <th style={ tbaleTh}> Valeur </th>
            
            <th style={ tbaleTh}> Qt Caisse  </th>
            <th style={ tbaleTh}> Valeur </th>
            
            <th style={ tbaleTh}> Qt Caisse  </th>
            <th style={ tbaleTh}> Valeur </th>
            
            {providers >= 4 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 4 && <th style={ tbaleTh}> Valeur  </th>}

            {providers >= 5 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 5 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 6 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 6 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 7 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 7 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 8 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 8 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 9 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 9 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 10 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 10 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 11 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 11 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 12 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 12 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 13 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 13 && <th style={ tbaleTh}> Valeur  </th>}
            
            {providers >= 14 && <th style={ tbaleTh}> Qt Caisse  </th>}
            {providers >= 14 && <th style={ tbaleTh}> Valeur  </th>}
            
        </tr>
    )
}