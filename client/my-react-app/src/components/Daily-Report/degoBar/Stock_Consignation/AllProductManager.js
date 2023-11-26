import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'
import { ExcelSecLayout } from "./productComp/Stock_Sec_Layout";
import { TableSuivi } from "./suiviAppro/SuiviTable";
import DailyFilter from "../../../filter/filterDailyRap";
import {productActions} from "../../../store/AllProductManager-slice";
import { alimProductActions } from "../../../store/AllProductManagerAlim-slice";
import AddProduct from './addProduct';
import objProvider from "../../../reuseFunction/suiviStockVente/objProvider";
import postAndUpdateData from "../../../reuseFunction/suiviStockVente/postAmdUpdateData";

function errMessage (dispatch, productActions, venteDego, productData, stateAction, update, venteJournaliereRef) {

  if (venteDego <= 0) {
    
    //focus the cursur on the error 
    venteJournaliereRef.current.focus();
    stateAction ? dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: "verifier la section vente journaliere"})) : dispatch(alimProductActions.setErrorMessage({status: true, errorAllowed: false, message: "verifier la section vente journaliere"}));
  } else {
    //for dego Bar
    if (stateAction && !update) {
      
      for (let i of productData){

        console.log ( (i.suivi1.name === '' && i.suivi1.qt_caisse > 0 ) || i.suivi1.name === '' )
        if (((i.suivi1.name === '' && i.suivi1.qt_caisse > 0 ) || i.suivi1.name === '')  ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide ou aucun produit ne peut ne pas avoir de fournisseur"}));
          break;
        } else if ((i.suivi2.name === '' && i.suivi2.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi3.name === '' && i.suivi3.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi4.name === '' && i.suivi4.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi5.name === '' && i.suivi5.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi6.name === '' && i.suivi6.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi7.name === '' && i.suivi7.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi8.name === '' && i.suivi8.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi9.name === '' && i.suivi9.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi10.name === '' && i.suivi10.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi11.name === '' && i.suivi11.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi12.name === '' && i.suivi12.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi13.name === '' && i.suivi13.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi14.name === '' && i.suivi14.qt_caisse > 0) ) {
  
          dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: " aucune valeur superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else {
  
          dispatch(productActions.setErrorMessage({status: false, errorAllowed: true, message: "Toute donnée sans nom sera automaticament supprimée, clicker encore sur *Enregistrer les données*"}));
        };
      };
    } else {
      dispatch(productActions.setErrorMessage({status: false, errorAllowed: true, message: "vous vous appretez a mettre vos donnees a jour les donnees, clicker encore sur *Mette a jour les donnees"}));
      
    };
    
    //for alimentation
    if (!stateAction && !update){
      dispatch(alimProductActions.setErrorMessage({status: false, errorAllowed: true, message: "Toute donnée sans nom sera automaticament supprimée, clicker encore sur *Enregistrer les données*"}));
    } else {
      dispatch(alimProductActions.setErrorMessage({status: false, errorAllowed: true, message: "vous vous appretez a mettre vos donnees a jour les donnees, clicker encore sur *Mette a jour les donnees"}));
    };
  };
};

export default function Product (props) {

  const dispatch = useDispatch();

  //dispact the action if it's dego or alimentation
  dispatch(productActions.setproduct( props.componentName === 'degoBar' ? true : false));

  //vente journaliere reference 
  const venteJournaliereRef = useRef(null);

  //check the component name
  const stateAction = useSelector (state => state.product.product);

  // Data we are using
  const productData = useSelector(state => state[props.sliceName].productData)

  //check if the data need an update or to be created
  const update = useSelector (state => state[props.sliceName].update);

  //toggle btn to display or hide useless data
  const toggleStoc = useSelector (state => state[props.sliceName].toggleStoc);

  //IDs
  const id = useSelector (state => state[props.sliceName].id);

  //venteprops.componentName  const venteDego = useSelector (state => state.product.venteDego);
  
  //date in forms
  const date = useSelector (state => state[props.sliceName].date);

  //date query
  const [dateParams, setDateParams] = useSearchParams();
  
  //to check today's date
  const currentYear = Number(new Date().getFullYear());
  const currentMonth = Number(new Date().getMonth() + 1);
  const currentDay = Number(new Date().getDate());

  //dependacies of useEffect
  const year = Number(dateParams.get("year"));
  const month = Number(dateParams.get("month"));
  const day = Number(dateParams.get("day"));

  //algo to get the previous day
  const today = new Date();

  //vente journaliere
  const venteDego = useSelector (state => state[props.sliceName].vente);

  // Soustrayez un jour à cet objet
  today.setDate(today.getDate() - 1);

  // Récupérez l'année, le mois et le jour de cet objet
  const prevYear = today.getFullYear();
  const prevMonth = today.getMonth() + 1; // Ajoutez 1 car le mois est indexé à partir de 0
  const prevDay = today.getDate();

  //boolen value to check the current date and the query parameters
  const dateState = year === currentYear && month === currentMonth && day === currentDay;

  //error message before sending the data to the server
  const errorMessage =  useSelector(state => state[props.sliceName].errorMessage);

  //fecth the data's day
  useEffect(() => {

    const fecthData = async () => {
      
      try {

        //initialisation of error message
        stateAction ? dispatch(productActions.setErrorMessage({status: true, errorAllowed: false, message: ""})) : dispatch(alimProductActions.setErrorMessage({status: true, errorAllowed: false, message: ""}))

        if (year < currentYear || month < currentMonth || day < currentDay) {

          stateAction ? dispatch(productActions.setProductdata(null)) :  dispatch(alimProductActions.setProductdata(null));

          const dataApi = await axios.get( `http://localhost:5001/api/v1/${props.componentName}/${props.produit}/rapportJournalier/${year}/${month}/${day}`);
          const dataVente = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/vente/${year}/${month}/${day}`);
          
          if (dataApi.data.data.day.length > 0 ){

            stateAction ? dispatch(productActions.setVenteDego(dataVente.data.data.day.valeur)) : dispatch(alimProductActions.setVenteDego(dataVente.data.data.day.valeur));
            stateAction ? dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }}))) : dispatch(alimProductActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }})));
            stateAction ? dispatch(productActions.setId(dataApi.data.data.id)) : dispatch(alimProductActions.setId(dataApi.data.data.id));
            stateAction ? dispatch(productActions.setUpdate(true)) : dispatch(alimProductActions.setUpdate(true));
            stateAction ? dispatch(productActions.setReadOnly(true)) : dispatch(alimProductActions.setReadOnly(true));
          } else {
            
            const lastCreatedData = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/${props.produit}/rapportJournalier/lastElement`); 
            
            if (lastCreatedData.data.data){
              
              stateAction ? dispatch(productActions.setVenteDego(0)) : dispatch(alimProductActions.setVenteDego(0));
              stateAction ? dispatch(productActions.setProductdata (lastCreatedData.data.data.map((el, index) =>  objProvider(props.componentName, el, index)))) : dispatch(alimProductActions.setProductdata (lastCreatedData.data.data.map((el, index) =>  objProvider(props.componentName, el, index))));
              stateAction ? dispatch(productActions.setUpdate(false)) : dispatch(alimProductActions.setUpdate(false));
              stateAction ? dispatch(productActions.setReadOnly(false)) : dispatch(alimProductActions.setReadOnly(false));
              
            } else {
              
              stateAction ? dispatch(productActions.setVenteDego(0)) :  dispatch(alimProductActions.setVenteDego(0));
              stateAction ? dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }}))) : dispatch(alimProductActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }})));
              stateAction ? dispatch(productActions.setId(dataApi.data.data.id)) : dispatch(alimProductActions.setId(dataApi.data.data.id));
              stateAction ? dispatch(productActions.setUpdate(false)) : dispatch(alimProductActions.setUpdate(false));
              stateAction ? dispatch(productActions.setReadOnly(false)) : dispatch(alimProductActions.setReadOnly(false));
              
            }
          };
        } else if ( dateState ) {

          const storageState = JSON.parse(localStorage.getItem(`${props.produit}${props.componentName}`));
          const vente = localStorage.getItem(props.vente);

          if ( storageState && storageState.data.length > 0) {
            if ( storageState.date.year === year && storageState.date.month === month && storageState.date.day === day) {
              
              stateAction ? dispatch(productActions.setVenteDego(vente)) : dispatch(alimProductActions.setVenteDego(vente));
              stateAction ? dispatch(productActions.setProductdata (storageState.data)) : dispatch(alimProductActions.setProductdata (storageState.data));
              stateAction ? dispatch(productActions.setId(storageState.id)) : dispatch(alimProductActions.setId(storageState.id));
              stateAction ? dispatch(productActions.setUpdate(true)) : dispatch(alimProductActions.setUpdate(true));
              stateAction ? dispatch(productActions.setReadOnly(true)) : dispatch(alimProductActions.setReadOnly(true));

            };
            if ( storageState.date.year === prevYear && storageState.date.month === prevMonth && storageState.date.day === prevDay) { 

              const dataApi = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/${props.produit}/rapportJournalier/${currentYear}/${currentMonth}/${currentDay}`);
              const dataVente = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/vente/${currentYear}/${currentMonth}/${currentDay}`);

              if (dataApi.data.data.day.length === 0) {

                if (dataVente.data.data.day ) {

                  stateAction ? dispatch(productActions.setVenteDego(dataVente.data.data.day.valeur)) : dispatch(alimProductActions.setVenteDego(dataVente.data.data.day.valeur));
                } else {

                  stateAction ? dispatch(productActions.setVenteDego(0)) : dispatch(alimProductActions.setVenteDego(0));
                };

                stateAction ? dispatch(productActions.setProductdata (storageState.data.map((el, index) => objProvider(props.componentName, el, index)))) : dispatch(alimProductActions.setProductdata (storageState.data.map((el, index) => objProvider(props.componentName, el, index))));
                stateAction ? dispatch(productActions.setId(storageState.id)) : dispatch(alimProductActions.setId(storageState.id));
                stateAction ? dispatch(productActions.setUpdate(false)) : dispatch(alimProductActions.setUpdate(false));
                stateAction ? dispatch(productActions.setReadOnly(false)) : dispatch(alimProductActions.setReadOnly(false));

              } else {
                
                stateAction ? dispatch(productActions.setVenteDego(dataVente.data.data.day.valeur)) : dispatch(alimProductActions.setVenteDego(dataVente.data.data.day.valeur));
                stateAction ? dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; }))) : dispatch(alimProductActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; })));
                stateAction ? dispatch(productActions.setId( dataApi.data.data.id)) :  dispatch(alimProductActions.setId( dataApi.data.data.id));
                stateAction ? dispatch(productActions.setUpdate(true)) : dispatch(alimProductActions.setUpdate(true));
                stateAction ? dispatch(productActions.setReadOnly(true)) : dispatch(alimProductActions.setReadOnly(true));

              };
            };
            
          } else {
            stateAction ? dispatch(productActions.setProductdata (null)) : dispatch(alimProductActions.setProductdata (null));
            
            const dataApi = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/${props.produit}/rapportJournalier/${currentYear}/${currentMonth}/${currentDay}`);
            const dataVente = await axios.get (`http://localhost:5001/api/v1/${props.componentName}/vente/${currentYear}/${currentMonth}/${currentDay}`);
            
            if (dataApi.data.data.day.length === 0) {

              const previousData = await axios.get(`http://localhost:5001/api/v1/${props.componentName}/${props.produit}/rapportJournalier/lastElement`);              
              
              if (dataVente.data.data.day){
                stateAction ? dispatch(productActions.setVenteDego(dataVente.data.data.day.valeur)) : dispatch(alimProductActions.setVenteDego(dataVente.data.data.day.valeur));
              } else {
                stateAction ? dispatch(productActions.setVenteDego(0)) : dispatch(alimProductActions.setVenteDego(0));
              };
              stateAction ? dispatch(productActions.setUpdate(false)) : dispatch(alimProductActions.setUpdate(false));
              stateAction ? dispatch(productActions.setReadOnly(false)) : dispatch(alimProductActions.setReadOnly(false));
              
              if (previousData.data.data) {
                
                stateAction ? dispatch(productActions.setProductdata (previousData.data.data.map((el, index) => objProvider(props.componentName, el, index)))) : dispatch(alimProductActions.setProductdata (previousData.data.data.map((el, index) => objProvider(props.componentName, el, index))));
  
              } else {
                stateAction ? dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index };}))) : dispatch(alimProductActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index };})));
                stateAction ? dispatch(productActions.setId( dataApi.data.data.id)) :  dispatch(alimProductActions.setId( dataApi.data.data.id));
              }
            } else {
              stateAction ? dispatch(productActions.setVenteDego(dataVente.data.data.day.valeur)) : dispatch(alimProductActions.setVenteDego(dataVente.data.data.day.valeur));
              stateAction ? dispatch(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; }))) : dispatch(alimProductActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; })));
              stateAction ? dispatch(productActions.setId( dataApi.data.data.id)) : dispatch(alimProductActions.setId( dataApi.data.data.id));
              stateAction ? dispatch(productActions.setUpdate(true)) : dispatch(alimProductActions.setUpdate(true));
              stateAction ? dispatch(productActions.setReadOnly(true)) : dispatch(alimProductActions.setReadOnly(true));

            };
          };
        };

      } catch (err) {
        if (err.message) {
          console.log(err);
        } else {
          console.log(err);
        }
      }
    };
    fecthData();
  }, [year, day, month, props.produit, dateState, props.componentName, props.vente, stateAction,]);

  //change date field 
  useEffect(() => {

    stateAction ? dispatch(productActions.setDate({year: year, month: month, day: day})) : dispatch(alimProductActions.setDate({year: year, month: month, day: day}));
  },[props.produit, year, month, day, stateAction]);

  //post data
  function postData() {
    
    //call post Data fuction
    postAndUpdateData(
      errMessage,
      errorMessage,
      year,
      month,
      day,
      productData,
      dispatch,
      null,
      venteDego,
      props,
      dateState,
      venteJournaliereRef
    );
  };

  function setFilterParams() {

    setDateParams(prev => prev = date);

  };

  //update data
  function UpdateData() {

    //call update Data fuction
    postAndUpdateData(
      errMessage,
      errorMessage,
      year,
      month,
      day,
      productData,
      dispatch,
      id,
      venteDego,
      props,
      dateState,
      venteJournaliereRef
    );

  };

  //handle Vente Journaliere
  function handleVente (e) {
    stateAction ? dispatch(productActions.setVenteDego (e.target.value)) : dispatch(alimProductActions.setVenteDego (e.target.value))
  };

  //handle toggle button
  function handleToggleBtn (e) {
    stateAction ? dispatch(productActions.setToggleStoc()) : dispatch(alimProductActions.setToggleStoc())
  };

  if ( (year > currentYear && month > currentMonth && day > currentDay) || (year === currentYear && month > currentMonth && day > currentDay) || (year === currentYear && month === currentMonth && day > currentDay)) {

    return (
    <div>
      <DailyFilter component = {'allProduct'}  prev = {date} onclick = {setFilterParams}/>
      <h1> Ouuups vous ne pouvez demander une donnée d'une date inexistante</h1>
    </div>
    );

    } else {

      if (productData) {
  
        if (productData.length > 0) {
  
          return (
            <div>
              <DailyFilter component = {'allProduct'}  prev = {date} onclick = {setFilterParams} />

              <label>Vente Journalière </label>
              <input ref={venteJournaliereRef} type="number" name="vente" onChange={handleVente} placeholder="Vente Journalière " value={venteDego}/>
              <ExcelSecLayout toggle = {toggleStoc} />
              <button onClick={handleToggleBtn} >{ !toggleStoc ? 'Cacher' : 'Afficher' }</button>
              { !update && <AddProduct stateAction = {stateAction} />}

              {/* display or hide the suivi appro table */}
             { stateAction && <span>
                <h1> Suivi Approvisinnemnt </h1>

                <TableSuivi />
                <button onClick={() => stateAction ? dispatch (productActions.setProvivers()) : dispatch (alimProductActions.setProvivers())}>{ !update ? 'Afficher Ou Ajouter un Fournisseur' : 'Afficher plus de Fournisseur' } </button>
              </span>}

              { !update ? <button onClick={postData}> Enregistrer les Donnees </button> : <button onClick={UpdateData}> Mettre à jour les données</button>}
              {errorMessage.status && !errMessage.errorAllowed ? <h3> {errorMessage.message} </h3> : <h3> {errorMessage.message} </h3> }
            </div>
          );
        } else {

          //abillity to modify the current date and the previous date
          return (
            <div>
                <DailyFilter component = {'allProduct'} prev = {date} onclick = {setFilterParams} />
                <AddProduct stateAction = {stateAction} />  
                <h4> Ooouups cette donnée est inexistante veillez clicker sur -Ajouter un Produit- pour la créée</h4>                
            </div>
          );

        };

      } else {
      
          return (
            <div> <h1> Loading...</h1></div>
          );

      } 
  };
}
