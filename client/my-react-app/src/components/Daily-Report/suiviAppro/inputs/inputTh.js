import React from "react";

export default function InputsTh (props) {

    const {tbaleTh} = require ('./css.js');
    return (
       <th colSpan={2} style={tbaleTh} >
        <input
            defaultValue={props.value}
            name = {props.nameValue}
            placeholder= {"Nom du fournisseur"}
            onChange={ (e) => {
                const {name, value } = e.target;
                return props.onchange ( name, value,)
            }}
        />
       </th>
    )
}