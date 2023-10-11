import React,{useState, useEffect} from "react";
import axios from 'axios';
import { useSearchParams, Link } from "react-router-dom";
import { ExcelMain } from "./Stock_Consignation/Stock_Main_Layout";
import { ExcelSecLayout } from "./Stock_Consignation/Stock_Sec_Layout";
import InputTd from "./suiviAppro/inputs/inputTd";
import { TableSuivi } from "./suiviAppro/SuiviTable";
import DailyFilter from "../filter/filterDailyRap";

export function Bralima ()
{
    // Data we are using 
    const [bralimaData, setBralimadata] = useState (null);

    //toggle btn to display or hide useless data
    const [toggleStoc, setToggleStoc] = useState (true);

    //count State to display more providers
    let [providers, setProviders] = useState (3);

    const  [date, setDate] = useState ({
        year: new Date().toLocaleDateString().slice(6),
        month: new Date().toLocaleDateString().slice(3, 5),
        day:  new Date().toLocaleDateString().slice(0,2 )
    });

    const [dateParams, setDateParams] = useSearchParams();

    //fecth the data's day
    useEffect( () => {
        
        const fetchProfil = async () => {
 
             try {
                
                 
                const data = await axios.get(`http://localhost:5001/api/v1/raportJournalier/autreProduit/${dateParams.get('year')}/${dateParams.get('month')}/${dateParams.get('day')}`);

                setBralimadata (data.data.data.day.map ( (el, index) => {return {...el, id: index }} ));
   
             } catch (err) {
                 if (err.message) {
 
                     console.log( err.data, err.data.status);
                 } else {
 
                     console.log (err);
                 }
             }
        };
        fetchProfil();
 
    }, [dateParams]);

    ///toggle btn to hide useless calcul in stock
    function toggleBtn () {

        setToggleStoc(toggleStoc ? false : true);
    };

    //display and hide Providers by difault three providers are displayed
    function AddProviders () {

        if (providers <= 14) {

            setProviders ( ++providers );
        }
    }

    //manage input's form in stock
    function handleFormInStock ( id, name, value, modvalue, objectvalue )
    {
        setBralimadata (
            prev => {
                if (modvalue === "" && objectvalue === "")
                {
                    return prev.map ( (data) =>
                        {
                            return data.id === Number (id) ? { ...data, [name]: value } : data
                        })
                }
                else if ( objectvalue === ""  && modvalue !== "")
                {
                    return prev.map ( (data) =>
                    {
                        return data.id === Number (id) ? { ...data, [name]: {...data[name], [modvalue]: value } } : data
                    })
                }
                else 
                {
                    return prev.map ( (data) =>
                    {
                        return data.id === Number (id) ? { ...data, [name]: {...data[name], [modvalue]: {...data[name][modvalue], [objectvalue]: value} } } : data
                    })
                }
            }
        )
    };

    //manage input's forms in suiviApp(data)
    function handleTdFormInSuivi (id, name, value, path ) {

        setBralimadata ( prev => {
            
            return prev.map ( (data) => {
                
                // console.log (typeof id );
                return data.id === Number (id) ? {...data, [path]: {...data[path], [name]: value} } : data
            });
        });
    };

    //manage input's forms in suiviApp (Just Table headers ) there is no ID to verify coz th must change in every element of array 
    function handleThFormInSuivi ( name, value)
    {

         setBralimadata ( prev => {
    
            return prev.map (data => {

                return {...data, [name]:{...data[name], name : value}};
            });
        });
        
    };

    //post data or UpdateData
    function postData () {
        
        const fetchProfil = async () => {
            
            const newBralimaData = await  bralimaData.map( el => {
                
                return {
                    name: el.name,
                    data: {
                        data: {
                            data:{...el }
                        }
                    }
                }
                
            });

                try {
                    
                const response = await axios.post('http://localhost:5001/api/v1/raportJournalier/autreProduit', newBralimaData );
                setBralimadata (response.data.data.day);
    
                } catch (err) {
                    if (err.message) {
    
                        console.log( err.data);
                    } else {
    
                        console.log (err);
                    }
                }
        };
        fetchProfil();
     
    };

    //add a new product (push to a arry)
    function addProduct () {
        
        setBralimadata (prev => [...prev, {
            name: "",

            id: prev.length + 1,

            achat_journalier:
            {
                qt_caisse:0,
                nbr_btll: 0,
                qt_btll: 0,
                prix_achat_gros: 0
            },

            benefice_sur_achat: {
                val_gros_approvisionnement: 0,
                val_det: 0,
                benefice: 0
            },

            vente_journaliere:
            {
                ref_prix_det: 0,
                qt_vendue_comptoir: 0,
                valeur: 0
            },

            business_projection:
            {
                sortie_cave: 0,
                stock_gen: 0,
                stock_dego: 0,
                val_stock_det: 0,
                ref_prix_gros: 0,
                val_stock_gros: 0,
                marge_beneficiaire: 0
            },

            stock_consignaions:
            {
                qt: 0,
                valeur: 0
            },

            stock_apres_vente:
            {
                reste_stock_comptoir:
                {
                    qt_btll: 0,
                    valeur: 0
                },
                reste_stock_depot:
                {
                    qt_caisses: 0,
                    qt_btll: 56,
                    valeur: 224000
                }
            },

            benefice_sur_vente:0,

            val_precedente:
            {
                stock_apres_ventente_rest_stock_comptoir_qt_btll: 0,
                stock_apres_ventente_rest_stock_depot_qt_btll: 0
            },
            
            suivi1: {

                name: "",
                qt_caisse: 0
            },
        
            suivi2: {
                
                name: "",
                qt_caisse: 0
            },
        
            suivi3: {

                name: "",
                qt_caisse: 0
            },
        
            suivi4: {

                name: "",
                qt_caisse: 0
            },
        
            suivi5: {

                name: "",
                qt_caisse: 0
            },
        
            suivi6: {

                name: "",
                qt_caisse: 0
            },
        
            suivi7: {

                name: "",
                qt_caisse: 0
            },
        
            suivi8: {

                name: "",
                qt_caisse: 0
            },
        
            suivi9: {

                name: "",
                qt_caisse: 0
            },
        
            suivi10: {

                name: "",
                qt_caisse: 0
            },
        
            suivi11: {

                name: "",
                qt_caisse: 0
            },
        
            suivi12: {

                name: "",
                qt_caisse: 0
            },
        
            suivi13: {

                name: "",
                qt_caisse: 0
            },
        
            suivi14: {

                name: "",
                qt_caisse: 0
            }
        }])
    };


    function setFilterParams () {

        setDateParams(date);
        
    };

    function changeFilter (name, value) {

        setDate(prev => {

            return {...prev, [name]: value}
        })
    } 

    if (bralimaData) {

        if (bralimaData.length > 0) {

            const displayTdSuivi = bralimaData.map (
                
              prev => {
                return (
                  < InputTd 
                        prev = {prev}
                        key = {prev.id}
                        onchange = { handleTdFormInSuivi }
                        toggleTd = {providers}
                    />
                )
              }
            );
    
            const displayDataMainExcel = bralimaData.map (
                prev => {
                
                    return (
                        <ExcelMain 
                            prev = { prev }
                            key = { prev.id }
                            onchange = { handleFormInStock }
                            toggle = {toggleStoc}
                        />
                    )
                }
            );
    
            return (
                <div>
                    <DailyFilter  prev = {date} onclick = {setFilterParams} onchange = {changeFilter}/>
                    <ExcelSecLayout toggle = {toggleStoc} name = {displayDataMainExcel} />
                    <button onClick={toggleBtn} >{ !toggleStoc ? 'Cacher' : 'Afficher' }</button>
                    <button onClick={addProduct}> Ajouter un Product </button>
    
                    <h1> Suivi Approvisinnemnt </h1>
    
                    <TableSuivi toggleSuivi = {providers}  tdData = {displayTdSuivi} data = {bralimaData} changeTh = {handleThFormInSuivi}/>
                    <button onClick={AddProviders}> Afficher Ou Ajouter un Fournisseur</button>
                    <button onClick={postData}> Enregistrer les Donnees </button>
                </div>
            )
        } else {

            return (
                <div>
                    <DailyFilter  prev = {date} onclick = {setFilterParams} onchange = {changeFilter}/>
                    <button onClick={addProduct}> Ajouter un produit</button>

                </div>
            )
        }
       } else {
    
        return (
            <div> <h1> Loading...</h1></div>
        )
    } 
}
