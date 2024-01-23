/* eslint-disable react/prop-types */

export default function InputsTh2 ({providers})
{
    const thStyle = "py-1 bg-indigo-200  dark:bg-violet-400 dark:text-white  px-3 border-solid font-normal border-2 border-gray-900";
    return (
        <tr>
            <th className={thStyle}> Qt Caisse  </th>
            <th className={thStyle}> Valeur </th>
            
            <th className={thStyle}> Qt Caisse  </th>
            <th className={thStyle}> Valeur </th>
            
            <th className={thStyle}> Qt Caisse  </th>
            <th className={thStyle}> Valeur </th>
            
            {providers >= 4 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 4 && <th className={thStyle}> Valeur  </th>}

            {providers >= 5 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 5 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 6 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 6 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 7 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 7 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 8 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 8 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 9 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 9 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 10 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 10 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 11 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 11 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 12 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 12 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 13 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 13 && <th className={thStyle}> Valeur  </th>}
            
            {providers >= 14 && <th className={thStyle}> Qt Caisse  </th>}
            {providers >= 14 && <th className={thStyle}> Valeur  </th>}
            
        </tr>
    )
}