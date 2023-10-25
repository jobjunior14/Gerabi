import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'
import { ExcelSecLayout } from "./Stock_Consignation/Stock_Sec_Layout";
import { TableSuivi } from "./suiviAppro/SuiviTable";
import DailyFilter from "../filter/filterDailyRap";
import { productActions } from "../store/AllProductManager-slice";
import AddProduct from './addProduct';


function objProvider(el, index){

   return {
    name: el.name,

    id: index,

    achat_journalier: {
      qt_caisse: 0,
      nbr_btll: 0,
      qt_btll: 0,
      prix_achat_gros: 0,
    },

    benefice_sur_achat: {
      val_gros_approvisionnement: 0,
      val_det: 0,
      benefice: 0,
    },

    vente_journaliere: {
      ref_prix_det: 0,
      qt_vendue_comptoir: 0,
      valeur: 0,
    },

    business_projection: {
      sortie_cave: 0,
      stock_gen: 0,
      stock_dego: 0,
      val_stock_det: 0,
      ref_prix_gros: 0,
      val_stock_gros: 0,
      marge_beneficiaire: 0,
    },

    stock_consignaions: {
      qt: 0,
      valeur: 0,
    },

    stock_apres_vente: {
      reste_stock_comptoir: {
        qt_btll: 0,
        valeur: 0,
      },
      reste_stock_depot: {
        qt_caisses: 0,
        qt_btll: 0,
        valeur: 0,
      },
    },

    benefice_sur_vente: 0,

    val_precedente: {
      stock_apres_ventente_rest_stock_comptoir_qt_btll: el.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll ||0,
      stock_apres_ventente_rest_stock_depot_qt_btll: el.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll || 0,
    },

    suivi1: {
      name: el.suivi1.name || "",
      qt_caisse: 0,
    },

    suivi2: {
      name: el.suivi2.name || "",
      qt_caisse: 0,
    },

    suivi3: {
      name: el.suivi3.name || "",
      qt_caisse: 0,
    },

    suivi4: {
      name: el.suivi4.name || "",
      qt_caisse: 0,
    },

    suivi5: {
      name: el.suivi5.name || "",
      qt_caisse: 0,
    },

    suivi6: {
      name: el.suivi6.name || "",
      qt_caisse: 0,
    },

    suivi7: {
      name: el.suivi7.name || "",
      qt_caisse: 0,
    },

    suivi8: {
      name: el.suivi8.name || "",
      qt_caisse: 0,
    },

    suivi9: {
      name: el.suivi9.name || "",
      qt_caisse: 0,
    },

    suivi10: {
      name: el.suivi10.name || "",
      qt_caisse: 0,
    },

    suivi11: {
      name: el.suivi11.name || "",
      qt_caisse: 0,
    },

    suivi12: {
      name: el.suivi12.name || "",
      qt_caisse: 0,
    },

    suivi13: {
      name: el.suivi13.name || "",
      qt_caisse: 0,
    },

    suivi14: {
      name: el.suivi14.name || "",
      qt_caisse: 0,
    },
  };
};

export default function Product (props) {


  const dispatch = useDispatch();

  // Data we are using
  const productData = useSelector(state => state.product.productData)

  //check if the data need an update or to be created
  const update = useSelector (state => state.product.update);

  //toggle btn to display or hide useless data
  const toggleStoc = useSelector (state => state.product.toggleStoc)

  //IDs
  const id = useSelector (state => state.product.id);

  
  //vente degobar
  const venteDego = useSelector (state => state.product.venteDego);
  
  //date in forms
  const date = useSelector (state => state.product.date);

  //date query
  const [dateParams, setDateParams] = useSearchParams();
  
  //to check today's date
  const todayYear = Number(new Date().getFullYear());
  const todayMonth = Number(new Date().getMonth() + 1);
  const todayDay = Number(new Date().getDate());

  //dependacies of useEffect
  const year = Number(dateParams.get("year"));
  const month = Number(dateParams.get("month"));
  const day = Number(dateParams.get("day"));

  //algo to get the previous day
  const today = new Date();

  // Soustrayez un jour à cet objet
  today.setDate(today.getDate() - 1);

  // Récupérez l'année, le mois et le jour de cet objet
  const prevYear = today.getFullYear();
  const prevMonth = today.getMonth() + 1; // Ajoutez 1 car le mois est indexé à partir de 0
  const prevDay = today.getDate();

  //boolen value to check the current date and the query parameters
  const dateState = year === todayYear && month === todayMonth && day === todayDay;

  //fecth the data's day
  useEffect(() => {

    const fecthData = async () => {
      
      try {

        if (year < todayYear || month < todayMonth || day < todayDay) {

          dispatch(productActions.setProductdata(null));

          const dataApi = await axios.get( `http://localhost:5001/api/v1/${props.produit}/raportJournalier/${year}/${month}/${day}`);

          const dataVente = await axios.get (`http://localhost:5001/api/v1/vente/${year}/${month}/${day}`);

          if (dataVente.data.data.day) dispatch(productActions.setVenteDego(dataVente.data.data.day.valeur))

          dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }})));
          dispatch(productActions.setId(dataApi.data.data.id))
          dispatch(productActions.setUpdate());
          dispatch(productActions.setReadOnly());

        } else if ( dateState ) {

          const storageState = JSON.parse(localStorage.getItem(`${props.produit}`));
          const vente = localStorage.getItem('vente');

          if ( storageState && storageState.data.length > 0) {

            if ( storageState.date.year === year && storageState.date.month === month && storageState.date.day === day) {
              
              dispatch(productActions.setVenteDego(vente))
              dispatch(productActions.setProductdata (storageState.data));
              dispatch(productActions.setId(storageState.id))
              dispatch(productActions.setUpdate());
              dispatch(productActions.setReadOnly());

            };
            
            if ( storageState.date.year === prevYear && storageState.date.month === prevMonth && storageState.date.day === prevDay) { 

              const dataApi = await axios.get(`http://localhost:5001/api/v1/${props.produit}/raportJournalier/${todayYear}/${todayMonth}/${todayDay}`);
              const dataVente = await axios.get (`http://localhost:5001/api/v1/vente/${todayYear}/${todayMonth}/${todayDay}`);

              if (dataApi.data.data.day.length === 0) {

                dispatch(productActions.setVenteDego(0))
                dispatch(productActions.setProductdata (storageState.data.map((el, index) => objProvider(el, index))));
                dispatch(productActions.setId(storageState.id))
                dispatch(productActions.setUpdate());
                dispatch(productActions.setReadOnly());

              } else {
                
                
                dispatch(productActions.setVenteDego(dataVente.data.data.day.valeur))
                dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; })));
                dispatch(productActions.setId( dataApi.data.data.id))
                dispatch(productActions.setUpdate());
                dispatch(productActions.setReadOnly());

              };
            };
            
          } else {

            dispatch(productActions.setProductdata (null));
            
            const dataApi = await axios.get(`http://localhost:5001/api/v1/${props.produit}/raportJournalier/${todayYear}/${todayMonth}/${todayDay}`);
              
            const previousData = await axios.get(`http://localhost:5001/api/v1/${props.produit}/raportJournalier/${prevYear}/${prevMonth}/${prevDay}`);
                              
            const dataVente = await axios.get (`http://localhost:5001/api/v1/vente/${todayYear}/${todayMonth}/${todayDay}`);
            
            if (dataApi.data.data.day.length === 0) {
          
              dispatch(productActions.setVenteDego(0))
              dispatch(productActions.setUpdate());
              dispatch(productActions.setReadOnly());
              
              if (previousData.data.data.day.length > 0) {
                
                dispatch(productActions.setProductdata (previousData.data.data.day.map((el, index) => objProvider(el, index))));
  
              } else {

                dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index };})));
                dispatch(productActions.setId( dataApi.data.data.id))
              }
            } else {

              dispatch(productActions.setVenteDego(dataVente.data.data.day.valeur))
              dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; })));
              dispatch(productActions.setId( dataApi.data.data.id))
              dispatch(productActions.setUpdate());
              dispatch(productActions.setReadOnly());

            };
          };
        };
      } catch (err) {
        if (err.message) {
          console.log(err.data);
        } else {
          console.log(err);
        }
      }
    };
    fecthData();
  }, [year, day, month, props.produit, dateState]);

  //post data or UpdateData
  function postData() {

    const fecthData = async () => {

      const newBralimaData = productData.map((el) => {
        return {
          name: el.name,
          data: {
            data: {
              data: { ...el },
            },
          },
        };
      });

      const newDataVente = {
        valeur: venteDego,
      };

      dispatch(productActions.setProductdata(null));
      try {
        const response = await axios.post( `http://localhost:5001/api/v1/${props.produit}/raportJournalier`, newBralimaData);
        const responseventeDego = await axios.post( "http://localhost:5001/api/v1/vente", newDataVente);

        dispatch(productActions.setUpdate());
        dispatch(productActions.setReadOnly());

        dispatch(productActions.setVenteDego(responseventeDego.data.data.day.valeur));
        dispatch(productActions.setProductdata( response.data.data.day.map((el, index) => { return { ...el, id: index }})));

      } catch (err) {
        if (err.message) {
          console.log(err.data);
        } else {
          console.log(err);
        }
      };

    };
    fecthData();

     if ( dateState ) {

      localStorage.setItem(`${props.produit}`, JSON.stringify({
        date: {
          year: year,
          month: month,
          day: day
        },
        data: productData,
        id: id,
      }));
      localStorage.setItem('vente', venteDego);
    };
  };

  function setFilterParams() {

    setDateParams(prev => prev = date);
    dispatch(productActions.setProductdata(null));

  };

  function UpdateData() {

    const fecthData = async () => {

      const newData = productData.map((el) => {
        return {
          name: el.name,
          data: {
            data: {
              data: {
                ...el,
                createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
              },
            },
          },
        };
      });

      const newData2 = { id: [...id], data: [...newData] };

      const newDataVente = {

        valeur: venteDego,
        createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
      }
      dispatch(productActions.setProductdata(null));

      try {

        //response of our main array
        const response = await axios.post( `http://localhost:5001/api/v1/${props.produit}/raportJournalier/${year}/${month}/${day}`, newData2 );

        const venteDegoResponse = await axios.post( `http://localhost:5001/api/v1/vente/${year}/${month}/${day}`, newDataVente );

        dispatch(productActions.setVenteDego (venteDegoResponse.data.data.day.valeur))
        dispatch(productActions.setProductdata (response.data.data.day.map((el, index) => { return { ...el, id: index };})));
        dispatch(productActions.setId (response.data.data.id));

      } catch (err) {
        if (err.message) {
          console.log(err);
        } else {
          console.log(err);
        }
      }
    };
    fecthData();

     if ( dateState ) {

      localStorage.setItem(`${props.produit}`, JSON.stringify({
        date: {
          year: year,
          month: month,
          day: day
        },
        data: productData,
        id: id,
      }));
      localStorage.setItem('vente', venteDego);
    };

  };

  console.log (productData);

  if ( (year > todayYear && month > todayMonth && day > todayDay) || (year === todayYear && month > todayMonth && day > todayDay) || (year === todayYear && month === todayMonth && day > todayDay)) {

    return (<div>
      <DailyFilter  prev = {date} onclick = {setFilterParams}/>
      <h1> Ouuups vous ne pouvez demander une donnée d'une date inexistante</h1>
    </div>);

    } else {

      if (productData) {
  
        if (productData.length > 0) {
  
          return (
            <div>
            

                <DailyFilter  prev = {date} onclick = {setFilterParams} />

                <label>Vente Journalière Dego</label>
                <input type="number" name="vente" onChange={ e =>  dispatch(productActions.setVenteDego (e.target.value))} placeholder="Vente Journalière Dego" defaultValue={venteDego}/>
                <ExcelSecLayout toggle = {toggleStoc} />
                <button onClick={() => dispatch(productActions.setToggleStoc())} >{ !toggleStoc ? 'Cacher' : 'Afficher' }</button>
                { !update && <AddProduct />}

                <h1> Suivi Approvisinnemnt </h1>

                <TableSuivi />
                <button onClick={() => dispatch (productActions.setProvivers())}>{ !update ? 'Afficher Ou Ajouter un Fournisseur' : 'Afficher plus de Fournisseur' } </button>
                
                { !update ? <button onClick={postData}> Enregistrer les Donnees </button> : <button onClick={UpdateData}> Mettre à jour les données</button>}

              
            </div>
          );
          } else {
              // console.log (year, todayDay);

            if ( dateState ){

              return (
                <div>
                
                    <DailyFilter  prev = {date} onclick = {setFilterParams} />
                    <AddProduct />                  
                </div>
              );

            } else {
                    
              return (
                <div> 
                 
                    <DailyFilter  prev = {date} onclick = {setFilterParams} />

                    <h3> Ooops la donnée de cette date est inexistante</h3>
                    <h4> S'il vous plait veillez chercher une autre date </h4>
                  
                </div>
              )
            }
         };

      } else {
      
          return (
            <div> <h1> Loading...</h1></div>
          );

      } 
  }
}
