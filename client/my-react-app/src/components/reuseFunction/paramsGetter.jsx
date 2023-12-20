import { useParams } from "react-router-dom";
//this logic will be used in all components whom need to know the component or the 
//product name (** that's mean every component***)
export default function useParamsGetter () {

    //distruct the params data and get the componentName and the productName
    const {componentName, productName} = useParams();
    //chekimg the componentName in the url (params) and return the rigth values
    if (componentName === 'degoBar') {
        return {
            componentName,
            productName,
            sliceName: 'product',
            //stateActions is there to avoid component to check ////
            //what data based on the component name are used//////////
            stateAction: true,
            venteName: 'venteDego'
        };
    } else {
        
        return {
            componentName,
            productName,
            sliceName: 'alimProduct',
            stateAction: false,
            venteName: 'venteAlimentation'
        };
    }
}