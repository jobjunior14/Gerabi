import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";

export default function SoriteCaisse (props) {
    
    const dispacth = useDispatch();

    const sortieCaisse = useSelector (state => state.suiviDepense.sortieCaisse);

    
    const subTAbleHeadersSortieCaisse = [];
    const tableHeaderSortieCaisse = [];
    const tableRowData = []; 


    if ( sortieCaisse && sortieCaisse.length > 0) {
        
        for (let i = 0; i < sortieCaisse.length; i++) {

            //array of main TH
             tableHeaderSortieCaisse.push(
                <th key={`th${i}`} colSpan={2}> 
                
                    <input 
                        type="text"
                        defaultValue={sortieCaisse[i].name}
                        id= {tableHeaderSortieCaisse.length}
                        name="name"
                        placeholder="Taper la fonction de sortie"
                        onChange={ (e) => {

                            const {name, value} = e.target;
                            dispacth (suiviDepenseActions.HandleSortieCaisse({name: name, value: value, mainindex: i, index: null }));
                        }}
                    />

                </th>
            );
            //arry of Sub TH
            subTAbleHeadersSortieCaisse.push(<td> Libelé </td>);
            subTAbleHeadersSortieCaisse.push (<td> Montant </td>);
        };
        
        for (let y = 0; y < sortieCaisse[0].data.length; y++) {
    
                const tableDataSortieCaisse = [];
        
                for (let j = 0;  j < sortieCaisse.length; j++) {
    
    
                    tableDataSortieCaisse.push(
                        <td>
                            <input
                                defaultValue={sortieCaisse[j].data[y].libel}
                                id = {tableDataSortieCaisse.length}
                                name = 'libel'
                                placeholder="Taper le libel"
                                onChange={ e => {
        
                                    const {name, value} = e.target;
                                    dispacth (suiviDepenseActions.HandleSortieCaisse({name: name, value: value, mainindex: j, index: y }));
                                }}
                            />
                        </td>
                    );
        
                    tableDataSortieCaisse.push(
                        <td>
                            <input
                                defaultValue={sortieCaisse[j].data[y].amount}
                                id = {tableDataSortieCaisse.length}
                                name = 'amount'
                                type="number"
                                placeholder="Taper le montant"
                                onChange={ e => {
        
                                    const {name, value} = e.target;
                                    dispacth (suiviDepenseActions.HandleSortieCaisse({name: name, value: Number (value), mainindex: j, index: y }));
                                }}
                            />
                        </td>
                    );
                    
                };
        
            tableRowData.push(<tr key={y}>{tableDataSortieCaisse}</tr>); 

        };
    };

    //save the varaibale before dispatch it
     let totalSortieCaisse = 0;   
   
    //calculate the total amount of sortie caisse
    if (sortieCaisse) {
        
        for (let i = 0; i < sortieCaisse.length; i++) {
    
            for (let j = 0; j < sortieCaisse[i].data.length; j++) {
                
                if (sortieCaisse[i].data.length > 0){

                    totalSortieCaisse += sortieCaisse[i].data[j].amount;
                };
            }
        };

        //set the sold caisse
        dispacth(suiviDepenseActions.setTotalSortieCaisse(totalSortieCaisse));
    };
    
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

                    </table>

                    <button onClick={() => dispacth(suiviDepenseActions.addLibelMontantSortie())}> Ajouter un justificatif</button>
                    <button onClick={() => dispacth(suiviDepenseActions.addFonctionSortie())}> Ajouter une fonction</button>
                </div>
            )
        } else {

            return (
                <div>
                    <button onClick={() => dispacth(suiviDepenseActions.addLibelMontantSortie())}> Ajouter un justificatif</button>
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