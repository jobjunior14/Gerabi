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

      setDisplayDataMainExcel(prev => prev = productData.map((prev) => {
        return (
          <ExcelMain
            prev={prev}
            key={prev.id}
          />
        );
      }));
    };
  }, [productData]);

  if (stateAction) {

    if (!toggleStoc) {
      return (
        <div className="w-full bg-slate-200 border-2 border-slate-500 rounded-md overflow-x-scroll p-2 font-normal">

          <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900" >
            <thead>
              <tr>
                <th rowSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  NOM
                </th>
                <th colSpan="4" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  ACHAT JOURNALIER
                </th>
                <th colSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  BENEFICE SUR ACHAT
                </th>
                <th colSpan="7" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  BUSINESS PROJECTION
                </th>
                <th colSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  VENTE JOURNALIERE
                </th>
                <th rowSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  BENEFICE SUR VENTE
                </th>
                <th colSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK CONSIGNATION
                </th>
                <th colSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK INITIAL
                </th>
                <th colSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK APRES VENTE
                </th>
              </tr>
    
              <tr>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> QUANTITE CAISSE </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> QUANTITE Btll </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Nbr Btll/C</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Prix d'achat Gros </th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Val Gros Appro</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Val Detail</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Benefice</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">STOCK GEN</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Sortie Cave</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Stock Degobar</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Valeur stock Det</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Ref prix Gros</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Val stock Gros</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Marge Benef</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Ref prix Det</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Qte Vendue comptoir</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Valeur </th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Quantié</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Valeur </th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste comptoir qt Btll</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste depot qt Btll</th>
    
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
        <div className="w-full bg-slate-200 border-2 border-slate-500 rounded-md overflow-x-scroll p-2">

          <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900">
            <thead>
              <tr>
                <th rowSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  NOM
                </th>
                <th colSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  ACHAT JOURNALIER
                </th>
                <th colSpan="1" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  Business Projection
                </th>
                <th colSpan="1" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  VENTE JOURNALIERE
                </th>
                <th colSpan="1" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK CONSIGNATION
                </th>
                <th colSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK INITIAL
                </th>
                <th colSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK APRES VENTE
                </th>
              </tr>
    
              <tr>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Qt  Caisse </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Qt Bouteilles </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Prix d'achat Gros </th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Sortie Cave</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Ref prix Det</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Quanté</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste comptoir qt Btll</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste depot qt Btll</th>
    
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
        <div className="w-full bg-slate-200 border-2 border-slate-500 rounded-md overflow-x-scroll p-2">

          <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900" >
            <thead>
              <tr>
                <th rowSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  NOM
                </th>
                <th colSpan="4" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  ACHAT JOURNALIER
                </th>
                <th colSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  BENEFICE SUR ACHAT
                </th>
                <th colSpan="7" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  BUSINESS PROJECTION
                </th>
                <th colSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  VENTE JOURNALIERE
                </th>
                <th rowSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  BENEFICE SUR VENTE
                </th>
                <th colSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK CONSIGNATION
                </th>
                <th colSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK INITIAL
                </th>
                <th colSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK APRES VENTE
                </th>
              </tr>
    
              <tr>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> QUANTITE CAISSE </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> QUANTITE Btll </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Nbr Btll/C</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Prix d'achat Gros </th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Val Gros Appro</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Val Detail</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Benefice</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">STOCK GEN</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Sortie Dego</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Stock Cave</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Valeur stock Det</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Ref prix Gros</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Val stock Gros</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Marge Benef</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Ref prix Det</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Qte Vendue comptoir</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Valeur </th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Quantié</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Valeur </th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste comptoir qt Btll</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste depot qt Btll</th>

                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste Stock </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Valeur </th>
              </tr>
            </thead>
    
            <tbody>{displayDataMainExcel}</tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="w-full bg-slate-200 border-2 border-slate-500 rounded-md overflow-x-scroll p-2">
           
          <table className=" border-collapse duration-300 table-fixed font-normal border-2 border-gray-900" >
            <thead>
              <tr>
                <th rowSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  Name
                </th>
                <th colSpan="3" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  ACHAT JOURNALIER
                </th>
                <th colSpan="1" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  Business Projection
                </th>
                <th colSpan="1" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  VENTE JOURNALIERE
                </th>
                <th colSpan="1" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK CONSIGNATION
                </th>
                <th colSpan="2" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK INITIAL
                </th>
                <th colSpan="1" className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">
                  STOCK APRES VENTE
                </th>
              </tr>
    
              <tr>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> QUANTITE CAISSE </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> QUANTITE Btll </th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Prix d'achat Gros </th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Sortie Cave</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Ref prix Det</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900">Quantié</th>
    
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste comptoir qt Btll</th>
                <th className=" py-1 bg-indigo-200 px-3 border-solid font-normal border-2 border-gray-900"> Reste depot qt Btll</th>
    
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
