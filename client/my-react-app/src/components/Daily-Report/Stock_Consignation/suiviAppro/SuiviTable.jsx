import { useState, useEffect } from 'react'
import InputsTh from './inputs/inputTh';
import InputsTh2 from './inputs/Th2';
import { useSelector } from 'react-redux';
import InputTd from './inputs/inputTd';
import useParamsGetter from '../../../reuseFunction/paramsGetter';

export function TableSuivi () {
    
    const productData = useSelector (state => state.product.productData);
    const providers = useSelector (state => state.product.providers);
                        /////const stateAction = useSelector (state => state.product.product);
    //stateAction is here to know wich component is using the data based to current usrl using the Params data
    const {stateAction} = useParamsGetter();

    const [displayTdSuivi, setDisplayTdSuivi] = useState();
    
    //side effect of product Data suivi stock et vente 
    useEffect (() => {

        if (stateAction) {
            
            if (productData && productData.length > 0) {
        
               setDisplayTdSuivi ( prev =>productData.map((prev) => {
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

    const thStyle = " py-1 bg-indigo-200  dark:bg-violet-400 dark:text-gray-100 px-3 border-solid font-normal border-2 border-gray-900";

    const rowSpan = 2;
    if (stateAction) {

       
        return (
            <div className='flex justify-center'>
                <div className="bg-slate-200 dark:bg-gray-600 w-auto border-2 border-slate-500 max-w-fit rounded-md overflow-x-auto p-3 font-normal">

                    <table className=" border-collapse  duration-300 table-fixed font-normal border-2 border-gray-900">
                        <thead>
                            <tr>
                                <th rowSpan= {rowSpan} className={thStyle}> Produit </th>
                                <th rowSpan= {rowSpan} className={thStyle}> Prix Achat Gros  </th>
                                <th rowSpan= {rowSpan} className={thStyle}> Nbr Btll  </th>
                                <InputsTh key  = {0} providers = {providers} />
                            </tr>
                            <InputsTh2  key = {1} providers = {providers} />
                            {displayTdSuivi}
                        </thead>
                    </table>
                </div>
            </div>

        );
    };
}