import { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch } from 'react-redux';
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
import PostAndUpdateError from "../../errorPages/postAndUpdateError";
import LoadingError from "../../errorPages/LoadingError";
import No_ExistentDate from '../../errorPages/no_existantDate';
import Loading from '../../loading';
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
  const {year, month, day, no_existent, setterDateParams, currentDay, currentMonth, currentYear} = useDateParams();
  
  //date in forms
  const [date, setDate] = useState({year, month, day});

  //vente journaliere
  const venteDego = useSelector (state => state[sliceName].vente);

  //custome hooks to post and update Data
  const {pAnduData, pAnduId, pAnduReadOnly, pAnduUpdate, pAnduLoading, pAnduVente, postAndUpdate, pAnduError} = usePostAndUpdateData(
    {
      componentName,
      productName,
      venteName,
    }
  );

  //error message before sending the data to the server
  const {errObj, setTheErrorMessage} = useErroMessage ({refVenteJournaliere: venteJournaliereRef, componentName: componentName});

  const {vente, customId, data, customUpdate, readOnly, loading, error} = useDataFetcherSuiviStock(
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
    //don't allow user to set a negative date or equal to 0
    if (value <= 0) value = '';

    setDate(prev => ({...prev, [name]: value}));
  }
  //search a specifique date 
  function setFilterParams() {
    if (date.year !== '' && date.month !== '' && date.day !== '')
    setterDateParams(date);
  }
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
  //display error on posting Data
  if (pAnduError) {
    return (
      <PostAndUpdateError message={pAnduError.message}/>
    )
  } else {

    if ( no_existent) {
  
      return (
        <>
          <DailyFilter onchange={handleDate}  prev = {date} onclick = {setFilterParams}/>
          <No_ExistentDate/>
        </>
      );
      } else {
        
        if (!(loading || pAnduLoading) && productData) {
  
          if ( productData.length > 0) {
            return (
              <>
                <DailyFilter onchange={handleDate}  prev = {date} onclick = {setFilterParams} />
      
                <UniqueInput>
                  <label className="font-bold text-indigo-600 dark:text-fuchsia-400 lg:text-xl  mr-7">Vente Journalière </label>
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
                <div className="my-5 block sm:flex justify-center ">
                  {/* reduce or diplay all the data in the suivi stock component */}
                  <div className="mb-3">
                    <button 
                      className="bg-gray-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                      onClick={handleToggleBtn}>
                      { !toggleStoc ? 'Reduire' : 'Agrandir' }</button>
                  </div>
  
                  <div className=" mb-3">
                    { !update && <AddProduct stateAction = {stateAction} />}
                  </div>
                  {/* check what nameComponent is using the component to update the button's display on the screen  */}
                  { !stateAction && <span className="block sm:flex justify-center">
                    { !update && !stateAction ? 
                      <div className="mt-3">
                        <button 
                          className="bg-indigo-500  duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                          onClick={postData}> Enregistrer les données 
                        </button> 
                      </div> :
                      <div className="mt-3">
                        <button
                          className="bg-indigo-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 " 
                          onClick={UpdateData}> Mettre à jour les données
                        </button>
                      </div>}
                  </span>}
                </div>
      
                {/* display or hide the suivi appro table basing on the component Name if it's DegoBar we will display it and if not we'll hide it */}
                <div className="">
  
                  { stateAction && <span>
                      <h1 className="font-bold lg:text-3xl text-2xl mt-8 mb-5 text-gray-700 dark:text-gray-50"> Suivi Approvisionnement </h1>
          
                      <TableSuivi />
  
                      <div>
                        <button 
                          className="bg-gray-500 duration- mt-5 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                          onClick={() => stateAction ? dispatch (productActions.setProvivers()) : dispatch (alimProductActions.setProvivers())}>{ !update ? 'Ajouter un Fournisseur' : 'Afficher plus de Fournisseur' } </button>
                      </div>
                    </span>}
                    {stateAction && <span>
                      { !update ? 
                        <div className="my-3">
                          <button 
                            className="bg-indigo-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                            onClick={postData}> Enregistrer les données 
                          </button> 
                        </div> :
                        <div>
                          <button
                            className="bg-indigo-500 duration-200 text-gray-50 py-1 px-4 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 " 
                            onClick={UpdateData}> Mettre à jour les données
                          </button>
                        </div>}
                    </span>}
                </div>
                {errObj.status && !errObj.errorAllowed ? <h3 className=" text-lg lg:text-2xl text-red-500 mt-6"> {errObj.message} </h3> : <h3> {errObj.message} </h3> }
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
                  <h4 className="lg:text-4xl text-xl :text-gray-700 dark:text-gray-50"> Ooouups!!! cette donnée est inexistante veillez clicker sur -Ajouter un Produit- pour la créée</h4>                
              </>
            );
            
          };
        } else {
          //the loading page
          if (loading || pAnduLoading) {
            return (<div className="-mt-20">
              <Loading/>
            </div>);
          }
  
          //the loadind data error page
          if (error) {
            return (
              <LoadingError message= {error.message}/>
            );
          }
        }
      }
  }
}
  