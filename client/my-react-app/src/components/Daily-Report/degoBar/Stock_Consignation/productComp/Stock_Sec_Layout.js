import { ExcelMain } from "./Stock_Main_Layout.js";
import { useSelector } from "react-redux";

const { table, tbaleTh } = require("./css.js");

export function ExcelSecLayout(props) {
  
  //house using the component
  const stateAction = useSelector (state => state.stateComp.stateComp);
  const productData = useSelector (state => stateAction ? state.product.productData : state.alimProduct.productData );
  const toggleStoc = useSelector (state => stateAction ?  state.product.toggleStoc : state.alimProduct.toggleStoc );

  let displayDataMainExcel = null;

  if (productData) {

    displayDataMainExcel = productData.map((prev) => {
      return (
        <ExcelMain
          prev={prev}
          key={prev.id}
        />
      );
    });
  };

  if (stateAction) {


    if (!toggleStoc) {
      return (
        <table className="table1" style={table}>
          <thead>
            <tr>
              <th rowSpan="3" style={tbaleTh}>
                NOM
              </th>
              <th colSpan="4" style={tbaleTh}>
                ACHAT JOURNALIER
              </th>
              <th colSpan="3" style={tbaleTh}>
                BENEFICE SUR ACHAT
              </th>
              <th colSpan="7" style={tbaleTh}>
                BUSINESS PROJECTION
              </th>
              <th colSpan="3" style={tbaleTh}>
                VENTE JOURNALIERE
              </th>
              <th rowSpan="2" style={tbaleTh}>
                BENEFICE SUR VENTE
              </th>
              <th colSpan="2" style={tbaleTh}>
                STOCK CONSIGNATION
              </th>
              <th colSpan="2" style={tbaleTh}>
                STOCK INITIAL
              </th>
              <th colSpan="3" style={tbaleTh}>
                STOCK APRES VENTE
              </th>
            </tr>
  
            <tr>
              <th style={tbaleTh}> QUANTITE CAISSE </th>
              <th style={tbaleTh}> QUANTITE Btll </th>
              <th style={tbaleTh}>Nbr Btll/C</th>
              <th style={tbaleTh}>Prix d'achat Gros </th>
  
              <th style={tbaleTh}>Val Gros Appro</th>
              <th style={tbaleTh}> Val Detail</th>
              <th style={tbaleTh}> Benefice</th>
  
              <th style={tbaleTh}>STOCK GEN</th>
              <th style={tbaleTh}>Sortie Cave</th>
              <th style={tbaleTh}> Stock Degobar</th>
              <th style={tbaleTh}>Valeur stock Det</th>
              <th style={tbaleTh}> Ref prix Gros</th>
              <th style={tbaleTh}>Val stock Gros</th>
              <th style={tbaleTh}>Marge Benef</th>
  
              <th style={tbaleTh}> Ref prix Det</th>
              <th style={tbaleTh}> Qte Vendue comptoir</th>
              <th style={tbaleTh}> Valeur </th>
  
              <th style={tbaleTh}>Quantié</th>
              <th style={tbaleTh}> Valeur </th>
  
              <th style={tbaleTh}> Reste comptoir qt Btll</th>
              <th style={tbaleTh}> Reste depot qt Btll</th>
  
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
      );
    } else {
      return (
        <table className="table1" style={table}>
          <thead>
            <tr>
              <th rowSpan="3" style={tbaleTh}>
                Name
              </th>
              <th colSpan="3" style={tbaleTh}>
                ACHAT JOURNALIER
              </th>
              <th colSpan="1" style={tbaleTh}>
                Business Projection
              </th>
              <th colSpan="1" style={tbaleTh}>
                VENTE JOURNALIERE
              </th>
              <th colSpan="1" style={tbaleTh}>
                STOCK CONSIGNATION
              </th>
              <th colSpan="2" style={tbaleTh}>
                STOCK INITIAL
              </th>
              <th colSpan="3" style={tbaleTh}>
                STOCK APRES VENTE
              </th>
            </tr>
  
            <tr>
              <th style={tbaleTh}> QUANTITE CAISSE </th>
              <th style={tbaleTh}> QUANTITE Btll </th>
              <th style={tbaleTh}>Prix d'achat Gros </th>
  
              <th style={tbaleTh}>Sortie Cave</th>
  
              <th style={tbaleTh}> Ref prix Det</th>
  
              <th style={tbaleTh}>Quantié</th>
  
              <th style={tbaleTh}> Reste comptoir qt Btll</th>
              <th style={tbaleTh}> Reste depot qt Btll</th>
  
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
      );
    }; 
  } else {
    if (!toggleStoc) {

      return (
        <table className="table1" style={table}>
          <thead>
            <tr>
              <th rowSpan="3" style={tbaleTh}>
                NOM
              </th>
              <th colSpan="4" style={tbaleTh}>
                ACHAT JOURNALIER
              </th>
              <th colSpan="3" style={tbaleTh}>
                BENEFICE SUR ACHAT
              </th>
              <th colSpan="7" style={tbaleTh}>
                BUSINESS PROJECTION
              </th>
              <th colSpan="3" style={tbaleTh}>
                VENTE JOURNALIERE
              </th>
              <th rowSpan="2" style={tbaleTh}>
                BENEFICE SUR VENTE
              </th>
              <th colSpan="2" style={tbaleTh}>
                STOCK CONSIGNATION
              </th>
              <th colSpan="2" style={tbaleTh}>
                STOCK INITIAL
              </th>
              <th colSpan="2" style={tbaleTh}>
                STOCK APRES VENTE
              </th>
            </tr>
  
            <tr>
              <th style={tbaleTh}> QUANTITE CAISSE </th>
              <th style={tbaleTh}> QUANTITE Btll </th>
              <th style={tbaleTh}>Nbr Btll/C</th>
              <th style={tbaleTh}>Prix d'achat Gros </th>
  
              <th style={tbaleTh}>Val Gros Appro</th>
              <th style={tbaleTh}> Val Detail</th>
              <th style={tbaleTh}> Benefice</th>
  
              <th style={tbaleTh}>STOCK GEN</th>
              <th style={tbaleTh}>Sortie Dego</th>
              <th style={tbaleTh}> Stock Cave</th>
              <th style={tbaleTh}>Valeur stock Det</th>
              <th style={tbaleTh}> Ref prix Gros</th>
              <th style={tbaleTh}>Val stock Gros</th>
              <th style={tbaleTh}>Marge Benef</th>
  
              <th style={tbaleTh}> Ref prix Det</th>
              <th style={tbaleTh}> Qte Vendue comptoir</th>
              <th style={tbaleTh}> Valeur </th>
  
              <th style={tbaleTh}>Quantié</th>
              <th style={tbaleTh}> Valeur </th>
  
              <th style={tbaleTh}> Reste comptoir qt Btll</th>
              <th style={tbaleTh}> Reste depot qt Btll</th>

              <th style={tbaleTh}> Reste Stock </th>
              <th style={tbaleTh}> Valeur </th>
            </tr>
          </thead>
  
          <tbody>{displayDataMainExcel}</tbody>
        </table>
      );
    } else {
      return (
        <table className="table1" style={table}>
          <thead>
            <tr>
              <th rowSpan="3" style={tbaleTh}>
                Name
              </th>
              <th colSpan="3" style={tbaleTh}>
                ACHAT JOURNALIER
              </th>
              <th colSpan="1" style={tbaleTh}>
                Business Projection
              </th>
              <th colSpan="1" style={tbaleTh}>
                VENTE JOURNALIERE
              </th>
              <th colSpan="1" style={tbaleTh}>
                STOCK CONSIGNATION
              </th>
              <th colSpan="2" style={tbaleTh}>
                STOCK INITIAL
              </th>
              <th colSpan="1" style={tbaleTh}>
                STOCK APRES VENTE
              </th>
            </tr>
  
            <tr>
              <th style={tbaleTh}> QUANTITE CAISSE </th>
              <th style={tbaleTh}> QUANTITE Btll </th>
              <th style={tbaleTh}>Prix d'achat Gros </th>
  
              <th style={tbaleTh}>Sortie Cave</th>
  
              <th style={tbaleTh}> Ref prix Det</th>
  
              <th style={tbaleTh}>Quantié</th>
  
              <th style={tbaleTh}> Reste comptoir qt Btll</th>
              <th style={tbaleTh}> Reste depot qt Btll</th>
  
              <th> Reste Stock </th>
            </tr>
          </thead>
  
          <tbody>{displayDataMainExcel}</tbody>
        </table>
      );
    }; 

    
  }

}
