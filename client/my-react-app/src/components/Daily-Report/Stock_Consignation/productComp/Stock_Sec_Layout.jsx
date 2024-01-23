import { ExcelMain } from "./Stock_Main_Layout";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useParamsGetter from "../../../reuseFunction/paramsGetter";

export function ExcelSecLayout() {
  
  //stateAction is here to know wich component is using the data based to current usrl using the Params data
  const {stateAction} = useParamsGetter();
  const productData = useSelector (state => stateAction ? state.product.productData : state.alimProduct.productData );
  const toggleStoc = useSelector (state => stateAction ?  state.product.toggleStoc : state.alimProduct.toggleStoc );

  const [displayDataMainExcel, setDisplayDataMainExcel] = useState (null);

  //perform the side effect
  useEffect(() => {
    
    if (productData) {

      setDisplayDataMainExcel(prev => productData.map((prev) => {
        return (
          <ExcelMain
            prev={prev}
            key={prev.id}
          />
        );
      }));
    };
  }, [productData]);

  const thStyle = " py-1 bg-indigo-200 dark:bg-violet-400 dark:text-gray-100  px-3 border-solid font-normal border-2 border-gray-900";
  if (stateAction) {

    if (!toggleStoc) {
      return (
        <div className="w-full dark:bg-gray-600  bg-slate-200 border-2 border-slate-500 rounded-md overflow-x-auto p-4 font-normal">

          <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900" >
            <thead>
              <tr>
                <th rowSpan="3" className={thStyle}>
                  NOM
                </th>
                <th colSpan="4" className={thStyle}>
                  ACHAT JOURNALIER
                </th>
                <th colSpan="3" className={thStyle}>
                  BENEFICE SUR ACHAT
                </th>
                <th colSpan="7" className={thStyle}>
                  BUSINESS PROJECTION
                </th>
                <th colSpan="3" className={thStyle}>
                  VENTE JOURNALIERE
                </th>
                <th rowSpan="2" className={thStyle}>
                  BENEFICE SUR VENTE
                </th>
                <th colSpan="2" className={thStyle}>
                  STOCK CONSIGNATION
                </th>
                <th colSpan="2" className={thStyle}>
                  STOCK INITIAL
                </th>
                <th colSpan="3" className={thStyle}>
                  STOCK APRES VENTE
                </th>
              </tr>
    
              <tr>
                <th className={thStyle}> QUANTITE CAISSE </th>
                <th className={thStyle}> QUANTITE Btll </th>
                <th className={thStyle}>Nbr Btll/C</th>
                <th className={thStyle}>Prix d'achat Gros </th>
    
                <th className={thStyle}>Val Gros Appro</th>
                <th className={thStyle}> Val Detail</th>
                <th className={thStyle}> Benefice</th>
    
                <th className={thStyle}>STOCK GEN</th>
                <th className={thStyle}>Sortie Cave</th>
                <th className={thStyle}> Stock Degobar</th>
                <th className={thStyle}>Valeur stock Det</th>
                <th className={thStyle}> Ref prix Gros</th>
                <th className={thStyle}>Val stock Gros</th>
                <th className={thStyle}>Marge Benef</th>
    
                <th className={thStyle}> Ref prix Det</th>
                <th className={thStyle}> Qte Vendue comptoir</th>
                <th className={thStyle}> Valeur </th>
    
                <th className={thStyle}>Quantié</th>
                <th className={thStyle}> Valeur </th>
    
                <th className={thStyle}> Reste comptoir qt Btll</th>
                <th className={thStyle}> Reste depot qt Btll</th>
    
                <tr>
                  <th
                    colSpan="2"
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      width: "33.3%",
                    }}
                  >
                    Reste comptoir
                  </th>
                  <th
                    colSpan="3"
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      width: "33.3%",
                    }}
                  >
                    Reste stock Depot
                  </th>
                  <th
                    rowSpan="2"
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      width: "33.3%",
                    }}
                  >
                    VALEUR STOCK
                  </th>
                </tr>
    
                <tr>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      borderTop: "solid thin",
                      width: "16.6%",
                    }}
                  >
                    Qte Bouteilles
                  </th>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      borderTop: "solid thin",
                      width: "16.6%",
                    }}
                  >
                    Valeur
                  </th>
    
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      borderTop: "solid thin",
                      width: "16.8%",
                    }}
                  >
                    Qte Caisses
                  </th>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      borderTop: "solid thin",
                      width: "16.6%",
                    }}
                  >
                    Qte Bouteilles
                  </th>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      borderTop: "solid thin",
                      width: "16.6%",
                    }}
                  >
                    Valeur
                  </th>
                </tr>
              </tr>
            </thead>
    
            <tbody>{displayDataMainExcel}</tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="w-full bg-slate-200 border-2 border-slate-500 rounded-md overflow-x-auto p-2">

          <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900">
            <thead>
              <tr>
                <th rowSpan="3" className={thStyle}>
                  NOM
                </th>
                <th colSpan="3" className={thStyle}>
                  ACHAT JOURNALIER
                </th>
                <th colSpan="1" className={thStyle}>
                  Business Projection
                </th>
                <th colSpan="1" className={thStyle}>
                  VENTE JOURNALIERE
                </th>
                <th colSpan="1" className={thStyle}>
                  STOCK CONSIGNATION
                </th>
                <th colSpan="2" className={thStyle}>
                  STOCK INITIAL
                </th>
                <th colSpan="3" className={thStyle}>
                  STOCK APRES VENTE
                </th>
              </tr>
    
              <tr>
                <th className={thStyle}> Qt  Caisse </th>
                <th className={thStyle}> Qt Bouteilles </th>
                <th className={thStyle}>Prix d'achat Gros </th>
    
                <th className={thStyle}>Sortie Cave</th>
    
                <th className={thStyle}> Ref prix Det</th>
    
                <th className={thStyle}>Quanté</th>
    
                <th className={thStyle}> Reste comptoir qt Btll</th>
                <th className={thStyle}> Reste depot qt Btll</th>
    
                <tr>
                  <th
                    colSpan="1"
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      width: "25%",
                    }}
                  >
                    Reste comptoir
                  </th>
                  <th
                    colSpan="1"
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      width: "25%",
                    }}
                  >
                    Reste stock Depot
                  </th>
                </tr>
    
                <tr>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      borderTop: "solid thin",
                      width: "12.5%",
                    }}
                  >
                    Qte Bouteilles
                  </th>
    
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "normal",
                      borderRight: "solid thin",
                      borderTop: "solid thin",
                      width: "12.5%",
                    }}
                  >
                    Qte Caisses
                  </th>
                </tr>
              </tr>
            </thead>
    
            <tbody>{displayDataMainExcel}</tbody>
          </table>
        </div>
      );
    }; 
  } else {
    if (!toggleStoc) {

      return (
        <div className="w-full bg-slate-200 border-2 border-slate-500 rounded-md overflow-x-auto p-2">

          <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900" >
            <thead>
              <tr>
                <th rowSpan="3" className={thStyle}>
                  NOM
                </th>
                <th colSpan="4" className={thStyle}>
                  ACHAT JOURNALIER
                </th>
                <th colSpan="3" className={thStyle}>
                  BENEFICE SUR ACHAT
                </th>
                <th colSpan="7" className={thStyle}>
                  BUSINESS PROJECTION
                </th>
                <th colSpan="3" className={thStyle}>
                  VENTE JOURNALIERE
                </th>
                <th rowSpan="2" className={thStyle}>
                  BENEFICE SUR VENTE
                </th>
                <th colSpan="2" className={thStyle}>
                  STOCK CONSIGNATION
                </th>
                <th colSpan="2" className={thStyle}>
                  STOCK INITIAL
                </th>
                <th colSpan="2" className={thStyle}>
                  STOCK APRES VENTE
                </th>
              </tr>
    
              <tr>
                <th className={thStyle}> QUANTITE CAISSE </th>
                <th className={thStyle}> QUANTITE Btll </th>
                <th className={thStyle}>Nbr Btll/C</th>
                <th className={thStyle}>Prix d'achat Gros </th>
    
                <th className={thStyle}>Val Gros Appro</th>
                <th className={thStyle}> Val Detail</th>
                <th className={thStyle}> Benefice</th>
    
                <th className={thStyle}>STOCK GEN</th>
                <th className={thStyle}>Sortie Dego</th>
                <th className={thStyle}> Stock Cave</th>
                <th className={thStyle}>Valeur stock Det</th>
                <th className={thStyle}> Ref prix Gros</th>
                <th className={thStyle}>Val stock Gros</th>
                <th className={thStyle}>Marge Benef</th>
    
                <th className={thStyle}> Ref prix Det</th>
                <th className={thStyle}> Qte Vendue comptoir</th>
                <th className={thStyle}> Valeur </th>
    
                <th className={thStyle}>Quantié</th>
                <th className={thStyle}> Valeur </th>
    
                <th className={thStyle}> Reste comptoir qt Btll</th>
                <th className={thStyle}> Reste depot qt Btll</th>

                <th className={thStyle}> Reste Stock </th>
                <th className={thStyle}> Valeur </th>
              </tr>
            </thead>
    
            <tbody>{displayDataMainExcel}</tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="w-full bg-slate-200 border-2 border-slate-500 rounded-md overflow-x-auto p-2">
           
          <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900" >
            <thead>
              <tr>
                <th rowSpan="3" className={thStyle}>
                  Name
                </th>
                <th colSpan="3" className={thStyle}>
                  ACHAT JOURNALIER
                </th>
                <th colSpan="1" className={thStyle}>
                  Business Projection
                </th>
                <th colSpan="1" className={thStyle}>
                  VENTE JOURNALIERE
                </th>
                <th colSpan="1" className={thStyle}>
                  STOCK CONSIGNATION
                </th>
                <th colSpan="2" className={thStyle}>
                  STOCK INITIAL
                </th>
                <th colSpan="1" className={thStyle}>
                  STOCK APRES VENTE
                </th>
              </tr>
    
              <tr>
                <th className={thStyle}> QUANTITE CAISSE </th>
                <th className={thStyle}> QUANTITE Btll </th>
                <th className={thStyle}>Prix d'achat Gros </th>
    
                <th className={thStyle}>Sortie Cave</th>
    
                <th className={thStyle}> Ref prix Det</th>
    
                <th className={thStyle}>Quantié</th>
    
                <th className={thStyle}> Reste comptoir qt Btll</th>
                <th className={thStyle}> Reste depot qt Btll</th>
    
                <th> Reste Stock </th>
              </tr>
            </thead>
    
            <tbody>{displayDataMainExcel}</tbody>
          </table>
        </div>
      );
    }; 

    
  };
}
