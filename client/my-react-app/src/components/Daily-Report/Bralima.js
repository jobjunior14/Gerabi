import { ExcelSecLayout } from "./Excel/Excel-SecLayout"
import { ExcelMain } from "./Excel/Excel-MainLayout"
import React,{useState, useEffect} from "react";
import axios from 'axios'
import { TableSuivi } from "./suiviAppro/mainTable";

export function Bralima ()
{
    const [bralimaData, setBralimadata] = useState (null);

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

    function Updating_Form ( id, name, value, modvalue, objectvalue )
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

    function UpdatingNameTh ( name, value)
    {

         setBralimadata ( prev => {
    
            return prev.map (data => {

                return {...data, [name]:{...data[name], name : value}};
            });
        });
        
    };
    
    if (bralimaData) {
        console.log(bralimaData)
    let displayDataMainExcel = bralimaData.map (
        prev => {
        
            return (
                <ExcelMain 
                    prev = { prev }
                    key = { prev._id }
                    onchange = { Updating_Form }
                />
            )
        }
        );


        return (
            <div>
                <ExcelSecLayout name = {displayDataMainExcel} total = '12'/>

                <h1> Suivi Appro</h1>

                <TableSuivi data = {bralimaData} changeTh = {UpdatingNameTh}/>
            </div>
        )
    } else {

        return (
            <div> <h1> Loading...</h1></div>
        )
   }

}
