import { productActions } from "../../store/AllProductManager-slice";
import {alimProductActions } from "../../store/AllProductManagerAlim-slice";
import axios from "axios";

export default function postAndUpdateData (errMessage, errorMessage, year, month, day, productData, dispatch, id, venteDego, props, dateState, venteJournaliereRef) {

  //calling the function to set the user's Message
  //if there is the error, data can't be sent to the server
  errMessage(dispatch, productActions, venteDego, productData, props.componentName === 'degoBar' ? true : false, id ? true : false, venteJournaliereRef);
  console.log (errorMessage);
  
  let data = [];
  // deleting all data with no name
    for (let i of productData) {
      
      if (i.name !== '') {
        data.push(i);
      };
    };

  if ( data.length > 0 ) {
    
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
            newData = data.map((el) => {
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
  
          props.componentName === 'degoBar' ? dispatch(productActions.setProductdata(null)) : dispatch(alimProductActions.setProductdata(null));
          // if id we update Data and if not we push or create it 
          const response = id ? await axios.post( `http://localhost:5001/api/v1/${props.componentName}/${props.produit}/rapportJournalier/${year}/${month}/${day}`, {id: [...id], data: [...newData]} ) : await axios.post( `http://localhost:5001/api/v1/${props.componentName}/${props.produit}/rapportJournalier?year=${year}&month=${month}&day=${day}`, newData);
          //check the component name to choose the right route vente system
          if (props.componentName === 'degoBar') {
              //vente dego bar
              const responseventeSystem = id ? await axios.post( `http://localhost:5001/api/v1/${props.componentName}/vente/${year}/${month}/${day}`, newDataVente ) : await axios.post( `http://localhost:5001/api/v1/${props.componentName}/vente?year=${year}&month=${month}&day=${day}`, newDataVente);
            
              //save the data in the local storage
              if ( dateState ) {
                localStorage.setItem(`${props.produit}${props.componentName}`, JSON.stringify({
                  date: {
                    year: year,
                    month: month,
                    day: day
                  },
                  data: response.data.data.day.map((el, index) => { return { ...el, id: index }}),
                  id: response.data.data.id,
                }));
                localStorage.setItem(props.vente, responseventeSystem.data.data.day.valeur);
              };
              
              dispatch(productActions.setVenteDego(responseventeSystem.data.data.day.valeur));
              dispatch(productActions.setId(response.data.data.id));
              dispatch(productActions.setProductdata( response.data.data.day.map((el, index) => { return { ...el, id: index }})));
              dispatch(productActions.setUpdate(true));
              dispatch(productActions.setReadOnly(true));
              
              
            } else  {
              //vente alimentation
              const responseventeSystem = id ? await axios.post( `http://localhost:5001/api/v1/${props.componentName}/vente/${year}/${month}/${day}`, newDataVente ) : await axios.post( `http://localhost:5001/api/v1/${props.componentName}/vente?year=${year}&month=${month}&day=${day}`, newDataVente);
              
              //save the data in the local storage
              if ( dateState ) {
    
                localStorage.setItem(`${props.produit}${props.componentName}`, JSON.stringify({
                  date: {
                    year: year,
                    month: month,
                    day: day
                  },
                  data: response.data.data.day.map((el, index) => { return { ...el, id: index }}),
                  id: response.data.data.id,
                }));
                localStorage.setItem(props.vente, responseventeSystem.data.data.day.valeur);
              };
              dispatch(alimProductActions.setVenteDego(responseventeSystem.data.data.day.valeur));
              dispatch(alimProductActions.setId(response.data.data.id));
              dispatch(alimProductActions.setProductdata( response.data.data.day.map((el, index) => { return { ...el, id: index }})));
              dispatch(alimProductActions.setUpdate(true));
              dispatch(alimProductActions.setReadOnly(true));
            };
          };
  
      } catch (err) {
        if (err.message) {
          console.log(err.data);
        } else {
          console.log(err);
        }
      };
  
    };fecthData();

    dispatch(productActions.setErrorMessage({status: false, errorAllowed: true, message: ""}));

  } else {

    dispatch(alimProductActions.setProductdata([]));
    dispatch(alimProductActions.setUpdate(false));
    dispatch(alimProductActions.setReadOnly(false));
  }

};