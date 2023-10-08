import { ExcelMain } from "./Stock_Consignation/Stock_Main_Layout";
import { ExcelSecLayout } from "./Stock_Consignation/Stock_Sec_Layout";
import React,{useState, useEffect} from "react";
import axios from 'axios'
import InputTd from "./suiviAppro/inputs/inputTd";
import { TableSuivi } from "./suiviAppro/SuiviTable";

export function Bralima ()
{
    const [bralimaData, setBralimadata] = useState (null);
    const [toggleStoc, setToggleStoc] = useState (true);

    useEffect( () => {
        
        const fetchProfil = async () => {
 
             try {
                 
                 const data = await axios.get('http://localhost:5001/api/v1/raportJournalier/autreProduit/2023/10/07');
                 setBralimadata (data.data.data.month);
                 
             } catch (err) {
                 if (err.message) {
 
                     console.log( err.data, err.data.status);
                 } else {
 
                     console.log (err);
                 }
             }
        };
        fetchProfil();
 
     }, []);

    function toggleBtn () {

        setToggleStoc(toggleStoc ? false : true);
    }

    function handleFormInStock ( id, name, value, modvalue, objectvalue )
    {
        setBralimadata (
            prev => {
                if (modvalue === "" && objectvalue === "")
                {
                    return prev.map ( (data) =>
                        {
                            return data._id === id ? { ...data, [name]: value } : data
                        })
                }
                else if ( objectvalue === ""  && modvalue !== "")
                {
                    return prev.map ( (data) =>
                    {
                        return data._id === id ? { ...data, [name]: {...data[name], [modvalue]: value } } : data
                    })
                }
                else 
                {
                    return prev.map ( (data) =>
                    {
                        return data._id === id ? { ...data, [name]: {...data[name], [objectvalue]: {...data[name][objectvalue], [modvalue]: value} } } : data
                    })
                }
            }
        )
    };

    function handleThFormInSuivi ( name, value)
    {

         setBralimadata ( prev => {
    
            return prev.map (data => {

                return {...data, [name]:{...data[name], name : value}};
            });
        });
        
    };

    function handleTdFormInSuivi (id, name, value, path ) {

        setBralimadata ( prev => {

            return prev.map ( data => {

                return data._id === id ? {...data, [path]: {...data[path], [name]: value} } : data
            })
        })
    }

    
    if (bralimaData) {
        
        const displayTdSuivi = bralimaData.map (
          
          prev => {
            return (
              < InputTd 
                    prev = {prev}
                    key = {prev._id}
                    onchange = { handleTdFormInSuivi }
                />
            )
          }
        );

        const displayDataMainExcel = bralimaData.map (
            prev => {
            
                return (
                    <ExcelMain 
                        prev = { prev }
                        key = { prev._id }
                        onchange = { handleFormInStock }
                        toggle = {toggleStoc}
                    />
                )
            }
        );

        
        return (
            <div>
                <ExcelSecLayout toggle = {toggleStoc} name = {displayDataMainExcel} total = '12'/>
                <button onClick={toggleBtn} >{ !toggleStoc ? 'Cacher' : 'Afficher' }</button>

                <h1> Suivi Approvisinnemnt </h1>

                <TableSuivi  tdData = {displayTdSuivi} data = {bralimaData} changeTh = {handleThFormInSuivi}/>
            </div>
        )
    } else {

        return (
            <div> <h1> Loading...</h1></div>
        )
   }

}
