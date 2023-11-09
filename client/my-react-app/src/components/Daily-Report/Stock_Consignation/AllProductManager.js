import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'
import { ExcelSecLayout } from "./productComp/Stock_Sec_Layout";
import { TableSuivi } from "./suiviAppro/SuiviTable";
import DailyFilter from "../../filter/filterDailyRap";
import {productActions} from "../../store/AllProductManager-slice"
import AddProduct from './addProduct';

function postAndUpdateData (errMessage, errorMessage, year, month, day, productData, dispacth, id, venteDego, props) {

  //calling the function to set the user's Message
  //if there is the error, data can't be sent to the server
  errMessage(dispacth, productActions, venteDego, productData);

  const fecthData = async () => {

    
    try {
      
      if (!errorMessage.status) {

        let newData = null;
        let newDataVente = null;
        let createdAt = `${year}-${month}-${day}T08:22:54.930Z`

        //update data format
        if ( month >= 10 && day >= 10) {
          createdAt = `${year}-${month}-${day}T08:22:54.930Z`
        } else if (month >= 10 && day < 10) { 
          createdAt = `${year}-${month}-0${day}T08:22:54.930Z`
        } else if (month < 10 && day >= 10) {
          createdAt = `${year}-0${month}-${day}T08:22:54.930Z`
        } else {         
          createdAt = `${year}-0${month}-0${day}T08:22:54.930Z`
        };

        //modeling data to our schema
          newData = productData.map((el) => {
            return {
              name: el.name,
              data: {
                data: {
                  data: { ...el,  createdAt: createdAt}
                },
              },
            };
          });

          //modeling data to our schema 
          newDataVente = {
            valeur: venteDego,
            createdAt: createdAt
          };

        dispacth(productActions.setProductdata(null));
        console.log(id);
        // if id we update Data and if not we push or create it 
        const response = id ? await axios.post( `http://localhost:5001/api/v1/${props.produit}/raportJournalier/${year}/${month}/${day}`, {id: [...id], data: [...newData]} ) : await axios.post( `http://localhost:5001/api/v1/${props.produit}/raportJournalier?year=${year}&month=${month}&day=${day}`, newData);
        const responseventeDego = id ? await axios.post( `http://localhost:5001/api/v1/vente/${year}/${month}/${day}`, newDataVente ) : await axios.post( `http://localhost:5001/api/v1/vente?year=${year}&month=${month}&day=${day}`, newDataVente);

        dispacth(productActions.setUpdate(true));
        dispacth(productActions.setReadOnly(true));
        dispacth(productActions.setVenteDego(responseventeDego.data.data.day.valeur));
        dispacth(productActions.setProductdata( response.data.data.day.map((el, index) => { return { ...el, id: index }})));
      };

    } catch (err) {
      if (err.message) {
        console.log(err.data);
      } else {
        console.log(err);
      }
    };

  };fecthData();
}

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

function errMessage (dispacth, productActions, venteDego, productData) {

  if (venteDego <= 0) {
  
    dispacth(productActions.setErrorMessage({status: true, message: "verifier la section vente journaliere"}));
  } else {
    
    for (let i of productData){
  
      if (i.name === "" ) {
  
        if (i.achat_journalier.qt_caisse > 0) {
  
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >achat journalier>quantié caisse"}));
          break;
        } else if (i.achat_journalier.nbr_btll > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >achat journalier>nbr bouteille"}));
          break;
        } else if (i.achat_journalier.prix_achat_gros > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >achat journalier>prix achat gros"}));
          break;
        } else if (i.business_projection.sortie_cave > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >business projection>sortie cave"}));
          break;
        } else if (i.vente_journaliere.ref_prix_det > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >vente journaliere>reference prix detaille"}));
          break;
        } else if (i.stock_consignaions.qt > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >stock consignation>quantié "}));
          break;
        } else if (i.val_precedente.stock_apres_ventente_rest_stock_comptoir_qt_btll > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >stock initial>reste comptoir qt bouteille"}));
          break;
        } else if (i.val_precedente.stock_apres_ventente_rest_stock_depot_qt_btll > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >stock apres vente>reste depot qt bouteille"}));
          break;
        } else if (i.stock_apres_vente.reste_stock_comptoir.qt_btll > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >stock apres vente >reste comptoir>qt bouteille"}));
          break;
        } else if (i.stock_apres_vente.reste_stock_depot.qt_caisses > 0) {
    
          dispacth(productActions.setErrorMessage({status: true, message: "un produit sans nom ne peut etre associer à une valeur superieure à 0 dans la section >stock apres vente >reste depot>qt caisse"}));
          break;
        } else if (((i.suivi1.name === '' && i.suivi1.qt_caisse > 0 ) || i.suivi1.name === '') ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi2.name === '' && i.suivi2.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi3.name === '' && i.suivi3.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi4.name === '' && i.suivi4.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi5.name === '' && i.suivi5.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi6.name === '' && i.suivi6.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi7.name === '' && i.suivi7.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi8.name === '' && i.suivi8.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi9.name === '' && i.suivi9.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi10.name === '' && i.suivi10.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi11.name === '' && i.suivi11.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi12.name === '' && i.suivi12.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi13.name === '' && i.suivi13.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi14.name === '' && i.suivi14.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else {
  
          dispacth(productActions.setErrorMessage({status: false, message: ""}));
        };
      } else {

        if (((i.suivi1.name === '' && i.suivi1.qt_caisse > 0 ) || i.suivi1.name === '') ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi2.name === '' && i.suivi2.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi3.name === '' && i.suivi3.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi4.name === '' && i.suivi4.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi5.name === '' && i.suivi5.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi6.name === '' && i.suivi6.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi7.name === '' && i.suivi7.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi8.name === '' && i.suivi8.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi9.name === '' && i.suivi9.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi10.name === '' && i.suivi10.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi11.name === '' && i.suivi11.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi12.name === '' && i.suivi12.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi13.name === '' && i.suivi13.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else if ((i.suivi14.name === '' && i.suivi14.qt_caisse > 0) ) {
  
          dispacth(productActions.setErrorMessage({status: true, message: " aucune valuer superieure à 0 ne peut ne pas etre relier à nom de fournisseur vide"}));
          break;
        } else {
  
          dispacth(productActions.setErrorMessage({status: false, message: ""}));
        };
      }
  
    };
  };
};

export default function Product (props) {

  const dispacth = useDispatch();

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
  const currentYear = Number(new Date().getFullYear());
  const currentMonth = Number(new Date().getMonth() + 1);
  const currentDay = Number(new Date().getDate());

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
  const dateState = year === currentYear && month === currentMonth && day === currentDay;

  //error message before sending the data to the server
  const errorMessage =  useSelector(state => state.product.errorMessage);

  //fecth the data's day
  useEffect(() => {

    const fecthData = async () => {
      
      try {

        //initialisation of error message
        dispacth(productActions.setErrorMessage({status: true, message: ""}));

        if (year < currentYear || month < currentMonth || day < currentDay) {

          dispacth(productActions.setProductdata(null));

          const dataApi = await axios.get( `http://localhost:5001/api/v1/${props.produit}/raportJournalier/${year}/${month}/${day}`);
          const dataVente = await axios.get (`http://localhost:5001/api/v1/vente/${year}/${month}/${day}`);
          
          if (dataApi.data.data.day.length > 0 ){

            
            dispacth(productActions.setVenteDego(dataVente.data.data.day.valeur));
            dispacth(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }})));
            dispacth(productActions.setId(dataApi.data.data.id));
            dispacth(productActions.setUpdate(true));
            dispacth(productActions.setReadOnly(true));
          } else {
            
            const lastCreatedData = await axios.get(`http://localhost:5001/api/v1/${props.produit}/raportJournalier/lastElement`); 
            
            if (lastCreatedData.data.data){
              
              dispacth(productActions.setVenteDego(0));
              dispacth(productActions.setProductdata (lastCreatedData.data.data.map((el, index) =>  objProvider(el, index))));
              dispacth(productActions.setUpdate(false));
              dispacth(productActions.setReadOnly(false));
              
            } else {
              
              dispacth(productActions.setVenteDego(0));
              dispacth(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }})));
              dispacth(productActions.setId(dataApi.data.data.id));
              dispacth(productActions.setUpdate(false));
              dispacth(productActions.setReadOnly(false));
              
            }
          };
        } else if ( dateState ) {

          const storageState = JSON.parse(localStorage.getItem(`${props.produit}`));
          const vente = localStorage.getItem('vente');

          if ( storageState && storageState.data.length > 0) {

            if ( storageState.date.year === year && storageState.date.month === month && storageState.date.day === day) {
              
              dispacth(productActions.setVenteDego(vente))
              dispacth(productActions.setProductdata (storageState.data));
              dispacth(productActions.setId(storageState.id))
              dispacth(productActions.setUpdate(true));
              dispacth(productActions.setReadOnly(true));

            };
            
            if ( storageState.date.year === prevYear && storageState.date.month === prevMonth && storageState.date.day === prevDay) { 

              const dataApi = await axios.get(`http://localhost:5001/api/v1/${props.produit}/raportJournalier/${currentYear}/${currentMonth}/${currentDay}`);
              const dataVente = await axios.get (`http://localhost:5001/api/v1/vente/${currentYear}/${currentMonth}/${currentDay}`);

              if (dataApi.data.data.day.length === 0) {

                if (dataVente.data.data.day ) {

                  dispacth(productActions.setVenteDego(dataVente.data.data.day.valeur));
                } else {

                  dispacth(productActions.setVenteDego(0));
                };

                dispacth(productActions.setProductdata (storageState.data.map((el, index) => objProvider(el, index))));
                dispacth(productActions.setId(storageState.id))
                dispacth(productActions.setUpdate(false));
                dispacth(productActions.setReadOnly(false));

              } else {
                
                dispacth(productActions.setVenteDego(dataVente.data.data.day.valeur))
                dispacth(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; })));
                dispacth(productActions.setId( dataApi.data.data.id))
                dispacth(productActions.setUpdate(true));
                dispacth(productActions.setReadOnly(true));

              };
            };
            
          } else {

            dispacth(productActions.setProductdata (null));
            
            const dataApi = await axios.get(`http://localhost:5001/api/v1/${props.produit}/raportJournalier/${currentYear}/${currentMonth}/${currentDay}`);
            const dataVente = await axios.get (`http://localhost:5001/api/v1/vente/${currentYear}/${currentMonth}/${currentDay}`);
            
            if (dataApi.data.data.day.length === 0) {

              const previousData = await axios.get(`http://localhost:5001/api/v1/${props.produit}/raportJournalier/lastElement`);              
              
              if (dataVente.data.data.day){
                dispacth(productActions.setVenteDego(dataVente.data.data.day.valeur))
              } else {
                dispacth(productActions.setVenteDego(0))
              };
              dispacth(productActions.setUpdate(false));
              dispacth(productActions.setReadOnly(false));
              
              if (previousData.data.data) {
                
                dispacth(productActions.setProductdata (previousData.data.data.map((el, index) => objProvider(el, index))));
  
              } else {

                dispacth(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index };})));
                dispacth(productActions.setId( dataApi.data.data.id))
              }
            } else {
              dispacth(productActions.setVenteDego(dataVente.data.data.day.valeur));
              dispacth(productActions.setProductdata (dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; })));
              dispacth(productActions.setId( dataApi.data.data.id))
              dispacth(productActions.setUpdate(true));
              dispacth(productActions.setReadOnly(true));

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
  }, [year, day, month, props.produit, dateState]);

  //change date field 
  useEffect(() => {

    dispacth(productActions.setDate({year: year, month: month, day: day}));
  },[props.produit, year, month, day]);
  
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
      dispacth,
      null,
      venteDego,
      props
    );

    if ( dateState && !errorMessage.status ) {

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
      dispacth,
      id,
      venteDego,
      props
    );

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

              <label>Vente Journalière Dego</label>
              <input type="number" name="vente" onChange={ e =>  dispacth(productActions.setVenteDego (e.target.value))} placeholder="Vente Journalière Dego" defaultValue={venteDego}/>
              <ExcelSecLayout toggle = {toggleStoc} />
              <button onClick={() => dispacth(productActions.setToggleStoc())} >{ !toggleStoc ? 'Cacher' : 'Afficher' }</button>
              { !update && <AddProduct />}

              <h1> Suivi Approvisinnemnt </h1>

              <TableSuivi />
              <button onClick={() => dispacth (productActions.setProvivers())}>{ !update ? 'Afficher Ou Ajouter un Fournisseur' : 'Afficher plus de Fournisseur' } </button>
              { !update ? <button onClick={postData}> Enregistrer les Donnees </button> : <button onClick={UpdateData}> Mettre à jour les données</button>}
              {errorMessage.status && <h3> {errorMessage.message} </h3>}
            </div>
          );
        } else {

          //abillity to modify the current date and the previous date
          return (
            <div>
            
                <DailyFilter component = {'allProduct'} prev = {date} onclick = {setFilterParams} />
                <AddProduct />  
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
