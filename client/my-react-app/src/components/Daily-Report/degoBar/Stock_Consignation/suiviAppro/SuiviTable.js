import React, { useState, useEffect } from 'react'
import InputsTh from './inputs/inputTh.js';
import InputsTh2 from './inputs/inputTh2.js';
import { useSelector } from 'react-redux';
import InputTd from './inputs/inputTd.js';
const {table, tbaleTh} = require ('./css.js');

export function TableSuivi (props) {
    
    const productData = useSelector (state => state.product.productData);
    const providers = useSelector (state => state.product.providers);
    const stateAction = useSelector (state => state.product.product);

    const [displayTdSuivi, setDisplayTdSuivi] = useState();
    
    //side effect of product Data suivi stock et vente 
    useEffect (() => {

        if (stateAction) {
            
            if (productData && productData.length > 0) {
        
               setDisplayTdSuivi ( prev => prev = productData.map((prev) => {
                    return (
                        <InputTd
                            prev={prev}
                            key={prev.id}
                            providers = {providers}
                        />
                    );
                }));
            };
           
        }
    }, [productData, providers]);

    
    if (stateAction) {

       
        return (
            <table className='table1' style={table}>
                <thead>
                    <tr>
                        <th rowSpan= '2' style={tbaleTh}> Produit </th>
                        <th rowSpan= '2' style={tbaleTh}> Prix Achat Gros  </th>
                        <th rowSpan= '2' style={tbaleTh}> Nbr Btll  </th>
                        <InputsTh key  = {0} providers = {providers} data = {productData[0]} />
                    </tr>
                    <InputsTh2  key = {1} providers = {providers} />
                    {displayTdSuivi}
                </thead>
            </table>
        );
    };
}