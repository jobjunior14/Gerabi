import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";
import { useId,useEffect, useState } from "react";

export default function SoriteCaisse () {
    
    const dispatch = useDispatch();

    const sortieCaisse = useSelector (state => state.suiviDepense.sortieCaisse);
    const readOnly = useSelector (state => state.suiviDepense.readOnly);
    const allTotalSortieCaisse = useSelector (state => state.suiviDepense.totalSortieCaisse);
    
    const [subTAbleHeadersSortieCaisse, setSubTAbleHeadersSortieCaisse] = useState ([]);
    const [tableHeaderSortieCaisse, setTableHeaderSortieCaisse] = useState ([]);
    const [tableRowData, setTableRowData] = useState([]); 
    const [displayTotFocnt, setDisplayTotFocnt] = useState(null);

    const id = useId ();

    
    //side effect body's table
    useEffect (() => {

        if ( sortieCaisse && sortieCaisse.length > 0) {
            
            const SavetableHeaderSortieCaisse = [];
            const SavesubTAbleHeadersSortieCaisse = [];
            for (let i = 0; i < sortieCaisse.length; i++) {
    
                //array of main TH
                 SavetableHeaderSortieCaisse.push(
                    <th key={`thSortie${i}`} colSpan={2}> 
                    
                        <input 
                            type="text"
                            value={sortieCaisse[i].name}
                            id= {tableHeaderSortieCaisse.length + id + `sortieCaisse[${i}].name`}
                            name="name"
                            readOnly = {readOnly}
                            placeholder="Taper la fonction de sortie"
                            onChange={ (e) => {
    
                                const {name, value} = e.target;
                                dispatch (suiviDepenseActions.HandleSortieCaisse({name: name, value: value, mainindex: i, index: null }));
                            }}
                        />
    
                    </th>
                );
                //arry of Sub TH
                SavesubTAbleHeadersSortieCaisse.push(<td key={`tdlibel${i}`}> Libelé </td>);
                SavesubTAbleHeadersSortieCaisse.push (<td key={`tdmontant${i}`}> Montant </td>);
            };
            //set the state
            setTableHeaderSortieCaisse(prev => SavetableHeaderSortieCaisse);
            setSubTAbleHeadersSortieCaisse(prev => SavesubTAbleHeadersSortieCaisse);
            
            const savetableRowData = [];
            for (let y = 0; y < sortieCaisse[0].data.length; y++) {
        
                    const tableDataSortieCaisse = [];
            
                    for (let j = 0;  j < sortieCaisse.length; j++) {
        
        
                        tableDataSortieCaisse.push(
                            <td key={`tdSortie${j}`}>
                                <input
                                    value={sortieCaisse[j].data[y].libel}
                                    id = {tableDataSortieCaisse.length + id + `sortieCaisse[${j}].data[${y}].libel`}
                                    name = 'libel'
                                    readOnly = {readOnly}
                                    placeholder="Taper le libel"
                                    onChange={ e => {
            
                                        const {name, value} = e.target;
                                        dispatch (suiviDepenseActions.HandleSortieCaisse({name: name, value: value, mainindex: j, index: y }));
                                    }}
                                />
                            </td>
                        );
            
                        tableDataSortieCaisse.push(
                            <td key = {`tdsortie${j}`}>
                                <input
                                    value={sortieCaisse[j].data[y].amount}
                                    id = {tableDataSortieCaisse.length + id + 'amount' + `sortieCaisse[${j}].data[${y}].amount`}
                                    name = 'amount'
                                    type="number"
                                    placeholder="Taper le montant"
                                    onChange={ e => {
            
                                        const {name, value} = e.target;
                                        dispatch (suiviDepenseActions.HandleSortieCaisse({name: name, value: Number (value), mainindex: j, index: y }));
                                    }}
                                />
                            </td>
                        );
                        
                    };
                savetableRowData.push(<tr key={y}>{tableDataSortieCaisse}</tr>); 
            };

            setTableRowData(prev => savetableRowData);
        };

        //save the varaibale before dispatch it
         let totalSortieCaisse = 0; 
         
         //display the total amount sortie for one row
         const saveDisplayTotFocnt = [];
       
        //calculate the total amount of sortie caisse
        if (sortieCaisse) {
            
            for (let i = 0; i < sortieCaisse.length; i++) {
    
                let totalFocnt = 0;
                for (let j = 0; j < sortieCaisse[i].data.length; j++) {
                    
                    if (sortieCaisse[i].data.length > 0 && sortieCaisse[i].name !== "" && sortieCaisse[i].data[j].libel !== ""){
    
                        totalSortieCaisse += sortieCaisse[i].data[j].amount;
                        totalFocnt += sortieCaisse[i].data[j].amount;
                    };
                };
                saveDisplayTotFocnt.push (<th key={`thsoriee${i}`}> Total </th>);
                saveDisplayTotFocnt.push (<td key = {`tdaaa${i}`}>{totalFocnt}</td>);
            };

            //set the display function
            setDisplayTotFocnt(prev => saveDisplayTotFocnt);
    
            //set the sold caisse
            dispatch(suiviDepenseActions.setTotalSortieCaisse(totalSortieCaisse));
        };
    }, [sortieCaisse, readOnly]);


    
   if (sortieCaisse) {

        if (sortieCaisse.length > 0) {
    
            return (
                <div>
                    <h2>Sorite Caisse</h2>
                    <table>
                        <thead>

                            <tr>
                                {tableHeaderSortieCaisse}
                            </tr>

                            <tr>
                                {subTAbleHeadersSortieCaisse}
                            </tr>
                        </thead>

                        <tbody>
                            {tableRowData}
                        </tbody>
                        <tfoot>
                            <tr key = {'trTotal'}>
                                {displayTotFocnt}
                            </tr>
                            <tr>
                                <th>Total Sortie</th>
                                <td> {allTotalSortieCaisse} </td>
                            </tr>
                        </tfoot>
                    </table>
                    { !readOnly && <button onClick={() => dispatch(suiviDepenseActions.addLibelMontantSortie())}> Ajouter un justificatif</button>}
                    { !readOnly && <button onClick={() => dispatch(suiviDepenseActions.addFonctionSortie())}> Ajouter une fonction</button>}
                </div>
            )
        } else {
            
            return (
                <div>
                    <h3>sortie Caisse</h3>
                    <button onClick={() => dispatch(suiviDepenseActions.addFonctionSortie())}> Ajouter une fonction</button>
                    <h4> Ooouups! cette donnee est inexistante </h4>
                </div>
            )
        };
   } else {

    return (
        <h4> Chargement.... </h4>
    )
   }

}