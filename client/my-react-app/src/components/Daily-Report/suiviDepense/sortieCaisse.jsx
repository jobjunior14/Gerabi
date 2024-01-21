/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { suiviDepenseActions } from "../../store/suiviDepense-slice";
import { useId,useEffect, useState } from "react";
import LoadingError from "../../errorPages/LoadingError";
import PostAndUpdateError from "../../errorPages/postAndUpdateError";
import Loading from "../../loading";
export default function SoriteCaisse ({loading, error, pError}) {
    
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
                    <th className="bg-slate-600 border-2 border-gray-900" key={`thSortie${i}`} colSpan={2}> 
                    
                        <input 
                            className="pl-2 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
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
                const subThStyle = "bg-slate-300 border-2 border-gray-900";
                SavesubTAbleHeadersSortieCaisse.push(<td className={subThStyle} key={`tdlibel${i}`}> Libelé </td>);
                SavesubTAbleHeadersSortieCaisse.push (<td className={subThStyle} key={`tdmontant${i}`}> Montant </td>);
            };
            //set the state 
            setTableHeaderSortieCaisse( SavetableHeaderSortieCaisse );
            setSubTAbleHeadersSortieCaisse( SavesubTAbleHeadersSortieCaisse );
            
            const savetableRowData = [];
            for (let y = 0; y < sortieCaisse[0].data.length; y++) {
        
                    const tableDataSortieCaisse = [];
            
                    for (let j = 0;  j < sortieCaisse.length; j++) {
        
                        tableDataSortieCaisse.push(
                            <td className="border-2 border-gray-900" key={`tdSortie${j}`}>
                                <input
                                    className="w-32 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
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
                            <td className="border-2 border-gray-900" key = {`tdsortie${j}`}>
                                <input
                                    className="w-32 bg-gray-50 duration-150 focus:scale-105 focus:outline-none focus:border-2 appearance-none border-2 focus:border-indigo-700 " 
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

            setTableRowData( savetableRowData );
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
                saveDisplayTotFocnt.push (<th className="border-2 border-gray-900" key={`thsoriee${i}`}> Total </th>);
                saveDisplayTotFocnt.push (<td className="border-2 border-gray-900" key = {`tdaaa${i}`}>{totalFocnt}</td>);
            };

            //set the display function
            setDisplayTotFocnt( saveDisplayTotFocnt );
    
            //set the sold caisse
            dispatch(suiviDepenseActions.setTotalSortieCaisse(totalSortieCaisse));
        }
    }, [sortieCaisse, readOnly]);



    //handle the post error's http Method
    if (pError) {
       return (<PostAndUpdateError message={pError.message}/>); 
    } else {

        if (!loading && sortieCaisse) {
    
            if (sortieCaisse.length > 0) {
        
                return (
                    <div className="text-center justify-center items-center block mt-5">
                        <div  className=" flex justify-center mt-10">
                            <h2 className="lg:text-2xl text-xl font-semibold text-gray-700 block absolute -mt-6 ">Sorite Caisse</h2>
                            <div className="text-center border-2 border-slate-600  overflow-x-auto px-4 mt-4 rounded-lg ">
                                <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900 my-5">
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
                                    <tfoot >
                                        <tr className="bg-slate-300" key = {'trTotal'}>
                                            {displayTotFocnt}
                                        </tr>
                                        <tr>
                                            <th>Total Sortie</th>
                                            <td colSpan={100000}> {allTotalSortieCaisse} </td>
                                        </tr>
                                    </tfoot>
                                </table>
                        </div>
                        </div>
                        <div  className="mt-5 block sm:flex justify-center">
                            <div className="mb-3">
                                { !readOnly && <button className="px-5 py-1  bg-gray-500 text-gray-100 rounded-md -mt-8  mx-2 text-sm sm:text-base" onClick={() => dispatch(suiviDepenseActions.addLibelMontantSortie())}> Ajouter un justificatif</button>}
                            </div>
    
                            <div>
                                { !readOnly && <button className="px-5 py-1  bg-gray-500 text-gray-100 rounded-md -mt-8  mx-2 text-sm sm:text-base" onClick={() => dispatch(suiviDepenseActions.addFonctionSortie())}> Ajouter une fonction</button>}
                            </div>
                        </div>
                    </div>
                );
            } else {
                
                return (
                    <div className="m-4">
                        <h3 className="lg:text-2xl text-xl font-semibold text-gray-700">Sortie Caisse</h3>
                        <h4> Ooouups! cette donnee est inexistante </h4>
                        <button className="px-5 py-1 bg-gray-500 text-gray-100 rounded-md " onClick={() => dispatch(suiviDepenseActions.addFonctionSortie())}> Ajouter une fonction</button>
                    </div>
                )
            };
       } else {
        //handle the get http method errors
        if (error) {
            return (<LoadingError message={error.message}/>);
        }
        //loading state 
        if (loading) {
            return (<h1 className="text-xl my-5 font-semibold">Chargement...</h1>);
        }
       }
    }

}