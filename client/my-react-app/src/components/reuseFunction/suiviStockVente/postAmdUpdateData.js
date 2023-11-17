import { productActions } from "../../store/AllProductManager-slice";
import {alimProductAction } from "../../store/AllProductManagerAlim-slice";
import axios from "axios";

export default function postAndUpdateData (errMessage, errorMessage, year, month, day, productData, dispatch, id, venteDego, props, componentName, actionName) {

     //calling the function to set the user's Message
  //if there is the error, data can't be sent to the server
  errMessage(dispatch, productActions, venteDego, productData);

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
        //////////////a revoir les dispatch ////////////////////////////////////////
        componentName === 'degoBar' ? dispatch(productActions.setProductdata(null)) : dispatch(alimProductAction.setProductdata(null));
        // if id we update Data and if not we push or create it 
        const response = id ? await axios.post( `http://localhost:5001/api/v1/${componentName}/${props.produit}/rapportJournalier/${year}/${month}/${day}`, {id: [...id], data: [...newData]} ) : await axios.post( `http://localhost:5001/api/v1/${props.produit}/rapportJournalier?year=${year}&month=${month}&day=${day}`, newData);
        //check the component name to choose the right route vente system
        if (componentName === 'degoBar') {
            //vente dego bar
            const responseventeSystem = id ? await axios.post( `http://localhost:5001/api/v1/venteDego/${year}/${month}/${day}`, newDataVente ) : await axios.post( `http://localhost:5001/api/v1/venteDego?year=${year}&month=${month}&day=${day}`, newDataVente);
    
            dispatch(productActions.setUpdate(true));
            dispatch(productActions.setReadOnly(true));
            dispatch(productActions.setVenteDego(responseventeSystem.data.data.day.valeur));
            dispatch(productActions.setProductdata( response.data.data.day.map((el, index) => { return { ...el, id: index }})));
        } else  {
          //vente alimentation
          const responseventeSystem = id ? await axios.post( `http://localhost:5001/api/v1/venteDego/${year}/${month}/${day}`, newDataVente ) : await axios.post( `http://localhost:5001/api/v1/venteDego?year=${year}&month=${month}&day=${day}`, newDataVente);
          /////////////a revoir les dispatch ////////////////////////////////////////
          dispatch(alimProductAction.setUpdate(true));
          dispatch(alimProductAction.setReadOnly(true));
          dispatch(alimProductAction.setVenteDego(responseventeSystem.data.data.day.valeur));
          dispatch(alimProductAction.setProductdata( response.data.data.day.map((el, index) => { return { ...el, id: index }})));
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
};