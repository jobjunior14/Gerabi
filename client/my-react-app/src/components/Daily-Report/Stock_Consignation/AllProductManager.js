import React, { useEffect, useRef } from "react";
import {useSelector, useDispatch } from 'react-redux'
import { ExcelSecLayout } from "./productComp/Stock_Sec_Layout";
import { TableSuivi } from "./suiviAppro/SuiviTable";
import DailyFilter from "../../filter/filterDailyRap";
import {productActions} from "../../store/AllProductManager-slice";
import { alimProductActions } from "../../store/AllProductManagerAlim-slice";
import AddProduct from './addProduct';
import UniqueInput from "../../reuseFunction/uniqueInput";
import useErroMessage from "./utils/errorMessage";
import useDataFetcherSuiviStock from "./utils/dataFetcher";
import usePostAndUpdateData from "./utils/postAndUpdateData";
import useDateParams from "../../reuseFunction/dateParams";

export default function Product ({componentName, sliceName, venteName, productName}) {

  const dispatch = useDispatch();

  //dispact the action if it's dego or alimentation
  dispatch(productActions.setproduct( componentName === 'degoBar' ? true : false));

  //vente journaliere reference 
  const venteJournaliereRef = useRef(null);

  //check the component name
  const stateAction = useSelector (state => state.product.product);

  // Data we are using
  const productData = useSelector(state => state[sliceName].productData)

  //check if the data need an update or to be created
  const update = useSelector (state => state[sliceName].update);

  //toggle btn to display or hide useless data
  const toggleStoc = useSelector (state => state[sliceName].toggleStoc);

  //IDs from the server
  const id = useSelector (state => state[sliceName].id);
  
  //date in forms
  const date = useSelector (state => state[sliceName].date);

  //date query
  const {year, month, day, currentDay, currentMonth, currentYear, setterDateParams} = useDateParams();

  //vente journaliere
  const venteDego = useSelector (state => state[sliceName].vente);

  //custome hooks to post and update Data
  const {pAnduData, pAnduError, pAnduId, pAnduReadOnly, pAnduUpdate, pAnduLoading, pAnduVente, postAndUpdate} = usePostAndUpdateData(
    {
      componentName: componentName,
      productName: productName,
      venteName: venteName,
    }
  );

  //error message before sending the data to the server
  const {errObj, setTheErrorMessage} = useErroMessage ({refVenteJournaliere: venteJournaliereRef, componentName: componentName});

  const {vente, customId, data, customUpdate, readOnly, error, loading} = useDataFetcherSuiviStock(
    {
      componentName: componentName,
      productName: productName,
      venteName: venteName,
    }
  );

  //dispatch the fetched data across all the components 
  useEffect(() => {
    //initialisation of error message
    setTheErrorMessage(true, [], false, venteDego);
    //dispatch the data across other components
    stateAction ? dispatch(productActions.setVenteDego(vente)) : dispatch(alimProductActions.setVenteDego(vente));
    stateAction ? dispatch(productActions.setProductdata (data)) : dispatch(alimProductActions.setProductdata (data));
    stateAction ? dispatch(productActions.setId(customId)) : dispatch(alimProductActions.setId(customId));
    stateAction ? dispatch(productActions.setUpdate(customUpdate)) : dispatch(alimProductActions.setUpdate(customUpdate));
    stateAction ? dispatch(productActions.setReadOnly(readOnly)) : dispatch(alimProductActions.setReadOnly(readOnly));
    
  }, [data, customId]);

  //dispatch post and update data 
  useEffect(() => {
    //initialisation of error message
    setTheErrorMessage(true, [], false, venteDego);

    stateAction ? dispatch(productActions.setVenteDego(pAnduVente)) : dispatch(alimProductActions.setVenteDego(pAnduVente));
    stateAction ? dispatch(productActions.setProductdata (pAnduData)) : dispatch(alimProductActions.setProductdata (pAnduData));
    stateAction ? dispatch(productActions.setId(pAnduId)) : dispatch(alimProductActions.setId(pAnduId));
    stateAction ? dispatch(productActions.setUpdate(pAnduReadOnly)) : dispatch(alimProductActions.setUpdate(pAnduReadOnly));
    stateAction ? dispatch(productActions.setReadOnly(pAnduUpdate)) : dispatch(alimProductActions.setReadOnly(pAnduUpdate));

  }, [pAnduData, pAnduId]);

  //change date field 
  useEffect(() => {

    stateAction ? dispatch(productActions.setDate({year: year, month: month, day: day})) : dispatch(alimProductActions.setDate({year: year, month: month, day: day}));
  },[productName, year, month, day, stateAction]);

  //post data
  function postData() {
    //call the fuction to verify that there is no erro before posting the data
    setTheErrorMessage(false, productData, null, venteDego);

    if (!errObj.status) {
      
      //call post Data fuction
      postAndUpdate(
        productData,
        null,
        venteDego,
      );
    };
  };
  //search a specifique date 
  function setFilterParams() {
    setterDateParams(date);
  };

  //update data
  function UpdateData() {
    //calling the function to verify that there is no error before updating the data
    setTheErrorMessage(false, productData, id, venteDego);
    
    if (!errObj.status) {

      //call update Data fuction
      postAndUpdate(
        productData,
        id,
        venteDego
      );
      stateAction ? dispatch(productActions.setVenteDego(pAnduVente)) : dispatch(alimProductActions.setVenteDego(pAnduVente));
      stateAction ? dispatch(productActions.setProductdata (pAnduData)) : dispatch(alimProductActions.setProductdata (pAnduData));
      stateAction ? dispatch(productActions.setId(pAnduId)) : dispatch(alimProductActions.setId(pAnduId));
      stateAction ? dispatch(productActions.setUpdate(pAnduReadOnly)) : dispatch(alimProductActions.setUpdate(pAnduReadOnly));
      stateAction ? dispatch(productActions.setReadOnly(pAnduUpdate)) : dispatch(alimProductActions.setReadOnly(pAnduUpdate));
    };

  };

  //handle Vente Journaliere
  function handleVente (e) {
    stateAction ? dispatch(productActions.setVenteDego (e.target.value)) : dispatch(alimProductActions.setVenteDego (e.target.value))
  };

  //handle toggle button
  function handleToggleBtn () {
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
      
      if (!loading || !pAnduLoading) {

        if (productData.length > 0) {
          return (
            <div>
              <DailyFilter component = {'allProduct'}  prev = {date} onclick = {setFilterParams} />
    
              <UniqueInput>
                <label>Vente Journalière </label>
                <input ref={venteJournaliereRef} type="number" name="vente" onChange={handleVente} placeholder="Vente Journalière " value={venteDego}/>
              </UniqueInput>
              
              <ExcelSecLayout toggle = {toggleStoc} />
              <button onClick={handleToggleBtn} >{ !toggleStoc ? 'Cacher' : 'Afficher' }</button>
              { !update && <AddProduct stateAction = {stateAction} />}
    
              {/* display or hide the suivi appro table basing on the component Name if it's DegoBar we will display it and if not we'll hide it */}
             { stateAction && <span>
                <h1> Suivi Approvisinnemnt </h1>
    
                <TableSuivi />
                <button onClick={() => stateAction ? dispatch (productActions.setProvivers()) : dispatch (alimProductActions.setProvivers())}>{ !update ? 'Afficher Ou Ajouter un Fournisseur' : 'Afficher plus de Fournisseur' } </button>
              </span>}
    
              { !update ? <button onClick={postData}> Enregistrer les Donnees </button> : <button onClick={UpdateData}> Mettre à jour les données</button>}
              {errObj.status && !errObj.errorAllowed ? <h3> {errObj.message} </h3> : <h3> {errObj.message} </h3> }
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
          <div> 
            <h1> Loading...</h1> 
            { pAnduError !== "" && <p>{pAnduError.response.data.erro.message}</p>}
            { error !== "" && <p>{error.response.data.erro.message}</p>}
            <h2>Internal server Error</h2>
          </div>
        );
      };
    };
};
