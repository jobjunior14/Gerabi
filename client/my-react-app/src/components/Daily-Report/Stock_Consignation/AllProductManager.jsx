import React, { useEffect, useRef, useState } from "react";
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
import useParamsGetter from "../../reuseFunction/paramsGetter";
import searchImage from "../../../assets/searchImage.png"

export default function Product () {

  const dispatch = useDispatch();
  //*******useParamsGetter it's a custom hooks how allows to use the same logique******** */
  //*******************in every component to get the some data using in the params and allows us */
  //**********to send some details to the component based on the data in the url (params) */
  const {componentName, sliceName, venteName, productName, stateAction} = useParamsGetter();

  //vente journaliere reference 
  const venteJournaliereRef = useRef(null);

  // Data we are using
  const productData = useSelector(state => state[sliceName].productData)

  //check if the data need an update or to be created
  const update = useSelector (state => state[sliceName].update);

  //toggle btn to display or hide useless data
  const toggleStoc = useSelector (state => state[sliceName].toggleStoc);

  //IDs from the server
  const id = useSelector (state => state[sliceName].id);
  
  //date query
  const {year, month, day, currentDay, currentMonth, currentYear, setterDateParams} = useDateParams();
  
  //date in forms
  const [date, setDate] = useState({year, month, day});

  //vente journaliere
  const venteDego = useSelector (state => state[sliceName].vente);

  //custome hooks to post and update Data
  const {pAnduData, pAnduId, pAnduReadOnly, pAnduUpdate, pAnduLoading, pAnduVente, postAndUpdate} = usePostAndUpdateData(
    {
      componentName,
      productName,
      venteName,
    }
  );

  //error message before sending the data to the server
  const {errObj, setTheErrorMessage} = useErroMessage ({refVenteJournaliere: venteJournaliereRef, componentName: componentName});

  const {vente, customId, data, customUpdate, readOnly, loading} = useDataFetcherSuiviStock(
    {
      componentName,
      productName,
      venteName
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
  //handle the date's fields
  function handleDate (name, value) {
    setDate(prev => ({...prev, [name]: Number(value)}));
  }
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
    };

  }

  //handle Vente Journaliere
  function handleVente (e) {
    stateAction ? dispatch(productActions.setVenteDego (e.target.value)) : dispatch(alimProductActions.setVenteDego (e.target.value))
  }

  //handle toggle button
  function handleToggleBtn () {
    stateAction ? dispatch(productActions.setToggleStoc()) : dispatch(alimProductActions.setToggleStoc())
  }

  if ( (year > currentYear && month > currentMonth && day > currentDay) || (year === currentYear && month > currentMonth && day > currentDay) || (year === currentYear && month === currentMonth && day > currentDay)) {

    return (
      <>
        <DailyFilter onchange={handleDate}  prev = {date} onclick = {setFilterParams}/>
        <div className=" flex items-center justify-center h-3/4">
          <img className=" h-96 w-auto" src={searchImage} alt="search image" />
        </div>
        <h1 className="text-4xl text-gray-700"> Ouuups!!! vous ne pouvez demander une donnée d'une date inexistante</h1>
      </>
    );
    } else {
      
      if (!(loading || pAnduLoading) && productData) {

        if ( productData.length > 0) {
          return (
            <>
              <DailyFilter onchange={handleDate}  prev = {date} onclick = {setFilterParams} />
    
              <UniqueInput>
                <label className="font-bold text-indigo-600 mr-7">Vente Journalière </label>
                <input 
                  className="h-7 w-28 bg-slate-400 appearance-none rounded-lg pl-2 hover:border-indigo-400 border-2 focus:bg-slate-500 text-white foucus:boder-2 focus:border-indigo-400 focus:outline-none border-gray-500 duration-200"
                  ref={venteJournaliereRef} 
                  type="number" 
                  name="vente" 
                  onChange={handleVente} 
                  placeholder="Vente Journalière " 
                  value={venteDego}
                />
              </UniqueInput>
              
              <ExcelSecLayout toggle = {toggleStoc} />
              {/* buttons to add more product, extend or not the main table */}
              <div className="my-5 ">
                <button 
                  className="bg-gray-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                  onClick={handleToggleBtn}>
                  { !toggleStoc ? 'Reduire' : 'Agrandir' }</button>
                { !update && <AddProduct stateAction = {stateAction} />}
                {/* check what nameComponent is using the component to update the display on the screen  */}
                { !stateAction && <span>
                  { !update && !stateAction ? 
                    <button 
                      className="bg-indigo-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                      onClick={postData}> Enregistrer les données 
                    </button> : 
                    
                    <button
                      className="bg-indigo-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 " 
                      onClick={UpdateData}> Mettre à jour les données
                    </button>}
                </span>}
              </div>
    
              {/* display or hide the suivi appro table basing on the component Name if it's DegoBar we will display it and if not we'll hide it */}
             { stateAction && <span>
                <h1 className="font-bold text-3xl mt-8 mb-5 text-gray-700"> Suivi Approvisinnemnt </h1>
    
                <TableSuivi />
                <button 
                  className="bg-gray-500 duration- mt-5 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                  onClick={() => stateAction ? dispatch (productActions.setProvivers()) : dispatch (alimProductActions.setProvivers())}>{ !update ? 'Afficher Ou Ajouter un Fournisseur' : 'Afficher plus de Fournisseur' } </button>
              </span>}
              {stateAction && <span>
                { !update ? 
                  <button 
                    className="bg-indigo-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                    onClick={postData}> Enregistrer les données 
                  </button> : 
                  
                  <button
                    className="bg-indigo-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 " 
                    onClick={UpdateData}> Mettre à jour les données
                  </button>}
              </span>}
              {errObj.status && !errObj.errorAllowed ? <h3 className="text-2xl text-red-700 mt-6"> {errObj.message} </h3> : <h3> {errObj.message} </h3> }
            </>
          );
        } else {
          //abillity to modify the current date and the previous date
          return (
            <>
                <DailyFilter onchange={handleDate} prev = {date} onclick = {setFilterParams} />
                <AddProduct stateAction = {stateAction} />  
                <div className=" flex items-center justify-center h-3/4">
                  <img className=" h-96 w-auto" src={searchImage} alt="search image" />
                </div>
                <h4 className="text-4xl text-gray-700"> Ooouups!!! cette donnée est inexistante veillez clicker sur -Ajouter un Produit- pour la créée</h4>                
            </>
          );
          
        };
      } else {
        return (
          <div className="relative items-center justify-center top-40"> 
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-full animate-pulse dark:bg-indigo-400"></div>
              <div className="w-8 h-8 rounded-full animate-pulse dark:bg-indigo-400"></div>
              <div className="w-8 h-8 rounded-full animate-pulse dark:bg-indigo-400"></div>
            </div>
          </div>
        );
      };
    };
  };
  