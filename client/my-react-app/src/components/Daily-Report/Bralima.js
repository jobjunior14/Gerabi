import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import { ExcelMain } from "./Stock_Consignation/Stock_Main_Layout";
import { ExcelSecLayout } from "./Stock_Consignation/Stock_Sec_Layout";
import InputTd from "./suiviAppro/inputs/inputTd";
import { TableSuivi } from "./suiviAppro/SuiviTable";
import DailyFilter from "../filter/filterDailyRap";

export function Bralima() {
  // Data we are using
  const [bralimaData, setBralimadata] = useState(null);

  //previous date
  const [readOnly, setReadOnly] = useState(true);

  //toggle btn to display or hide useless data
  const [toggleStoc, setToggleStoc] = useState(true);

  //count State to display more providers
  let [providers, setProviders] = useState(3);

  //check if the data need an update or to be created
  const [update, setUpdate] = useState(true);

  //IDs
  const [id, setId] = useState(null);

  //date query
  const [dateParams, setDateParams] = useSearchParams();

  //vente degobar

  const [venteDego, setVenteDego] = useState(null);

  //to check today's date
  const todayYear = Number(new Date().getFullYear());
  const todayMonth = Number(new Date().getMonth() + 1);
  const todayDay = Number(new Date().getDate());

  //dependacies of useEffect
  const year = Number(dateParams.get("year"));
  const month = Number(dateParams.get("month"));
  const day = Number(dateParams.get("day"));

  //input date
  const [date, setDate] = useState({
    year: year,
    month: month,
    day: day,
  });

  //fecth the data's day
  useEffect(() => {
    const fecthData = async () => {
      try {

        if (year < todayYear || month < todayMonth || day < todayDay) {

          setBralimadata(null);

          const dataApi = await axios.get( `http://localhost:5001/api/v1/raportJournalier/autreProduit/${year}/${month}/${day}`);

          const dataVente = await axios.get (`http://localhost:5001/api/v1/vente/${year}/${month}/${day}`);

          setVenteDego (dataVente.data.data.day.valeur);

          setBralimadata(
            dataApi.data.data.day.map((el, index) => {

              return { ...el, id: index };})
          );
          
          setId(dataApi.data.data.id);
          setUpdate(true);
          setReadOnly(true);

        } else if ( year === todayYear && month === todayMonth && day === todayDay ) {

          setBralimadata(null);

          //algo to get the previous day
          const today = new Date();

          // Soustrayez un jour à cet objet
          today.setDate(today.getDate() - 1);

          // Récupérez l'année, le mois et le jour de cet objet
          const prevYear = today.getFullYear();
          const prevMonth = today.getMonth() + 1; // Ajoutez 1 car le mois est indexé à partir de 0
          const prevDay = today.getDate();

          const dataApi = await axios.get(
            `http://localhost:5001/api/v1/raportJournalier/autreProduit/${todayYear}/${todayMonth}/${todayDay}`
          );
          const previousData = await axios.get(
            `http://localhost:5001/api/v1/raportJournalier/autreProduit/${prevYear}/${prevMonth}/${prevDay}`
          );

          const dataVente = await axios.get (`http://localhost:5001/api/v1/vente/${todayYear}/${todayMonth}/${todayDay}`);

          //set data vente dego

          
          if (dataApi.data.data.day.length === 0) {
            
            setUpdate(false);
            setReadOnly(false);
            setVenteDego (0);
            
            if (previousData.data.data.day.length > 0) {

              setBralimadata(
                previousData.data.data.day.map((el, index) => {
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
                      stock_apres_ventente_rest_stock_comptoir_qt_btll:
                        el.val_precedente
                          .stock_apres_ventente_rest_stock_comptoir_qt_btll ||
                        0,
                      stock_apres_ventente_rest_stock_depot_qt_btll:
                        el.val_precedente
                          .stock_apres_ventente_rest_stock_depot_qt_btll || 0,
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
                })
              );

            } else {
              setBralimadata(
                dataApi.data.data.day.map((el, index) => {
                  return { ...el, id: index };
                })
              );
              setId(dataApi.data.data.id);
            }
          } else {

            setVenteDego(dataVente.data.data.day.valeur);
            setBralimadata(

              dataApi.data.data.day.map((el, index) => { return { ...el, id: index }; })
            );
            
            setId(dataApi.data.data.id);
            setUpdate(true);
            setReadOnly(true);
          }
        }
      } catch (err) {
        if (err.message) {
          console.log(err.data);
        } else {
          console.log(err);
        }
      }
    };
    fecthData();
  }, [year, day, month]);

  ///toggle btn to hide useless calcul in stock
  function toggleBtn() {
    setToggleStoc(toggleStoc ? false : true);
  };

  //display more providers
  function AddProviders() {
    if (providers <= 14) {
      setProviders(++providers);
    }
  };

  //manage states in stock
  function handleFormInStock(id, name, value, modvalue, objectvalue) {
    setBralimadata((prev) => {
      if (modvalue === "" && objectvalue === "") {
        return prev.map((data) => {
          return data.id === Number(id) ? { ...data, [name]: value } : data;
        });
      } else if (objectvalue === "" && modvalue !== "") {
        return prev.map((data) => {
          return data.id === Number(id)
            ? { ...data, [name]: { ...data[name], [modvalue]: value } }
            : data;
        });
      } else {
        return prev.map((data) => {
          return data.id === Number(id)
            ? {
                ...data,
                [name]: {
                  ...data[name],
                  [modvalue]: { ...data[name][modvalue], [objectvalue]: value },
                },
              }
            : data;
        });
      }
    });
  };

  //manage input's forms in suiviApp(data)
  function handleTdFormInSuivi(id, name, value, path) {
    setBralimadata((prev) => {
      return prev.map((data) => {
        // console.log (typeof id );
        return data.id === Number(id)
          ? { ...data, [path]: { ...data[path], [name]: value } }
          : data;
      });
    });
  };

  //manage input's forms in suiviApp (Just Table headers ) there is no ID to verify coz th must change in every element of array
  function handleThFormInSuivi(name, value) {
    setBralimadata((prev) => {
      return prev.map((data) => {
        return { ...data, [name]: { ...data[name], name: value } };
      });
    });
  };

  function handleFormVenteDego(value){

    setVenteDego(prev => prev = value);
    
  };

  //post data or UpdateData
  function postData() {
    const fecthData = async () => {

      const newBralimaData = await bralimaData.map((el) => {
        return {
          name: el.name,
          data: {
            data: {
              data: { ...el },
            },
          },
        };
      });

      const newDataVente = {
        valeur: venteDego,
      }

      setBralimadata(null);
      try {
        const response = await axios.post( "http://localhost:5001/api/v1/raportJournalier/autreProduit", newBralimaData);
        const responseventeDego = await axios.post( "http://localhost:5001/api/v1/vente", newDataVente);

        setUpdate(true);
        setReadOnly(true);

        setVenteDego(responseventeDego.data.data.day.valeur);
        setBralimadata(
          response.data.data.day.map((el, index) => { return { ...el, id: index }; })
        );
      } catch (err) {
        if (err.message) {
          console.log(err.data);
        } else {
          console.log(err);
        }
      }
    };
    fecthData();
  };

  //add a new product (push to a arry)
  function addProduct() {
    setBralimadata((prev) => [
      ...prev,
      {
        name: "",

        id: prev.length + 1,

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
            qt_btll: 56,
            valeur: 224000,
          },
        },

        benefice_sur_vente: 0,

        val_precedente: {
          stock_apres_ventente_rest_stock_comptoir_qt_btll: 0,
          stock_apres_ventente_rest_stock_depot_qt_btll: 0,
        },

        suivi1: {
          name: "",
          qt_caisse: 0,
        },

        suivi2: {
          name: "",
          qt_caisse: 0,
        },

        suivi3: {
          name: "",
          qt_caisse: 0,
        },

        suivi4: {
          name: "",
          qt_caisse: 0,
        },

        suivi5: {
          name: "",
          qt_caisse: 0,
        },

        suivi6: {
          name: "",
          qt_caisse: 0,
        },

        suivi7: {
          name: "",
          qt_caisse: 0,
        },

        suivi8: {
          name: "",
          qt_caisse: 0,
        },

        suivi9: {
          name: "",
          qt_caisse: 0,
        },

        suivi10: {
          name: "",
          qt_caisse: 0,
        },

        suivi11: {
          name: "",
          qt_caisse: 0,
        },

        suivi12: {
          name: "",
          qt_caisse: 0,
        },

        suivi13: {
          name: "",
          qt_caisse: 0,
        },

        suivi14: {
          name: "",
          qt_caisse: 0,
        },
      },
    ]);
  };

  function setFilterParams() {
    setDateParams(date);
    setBralimadata(null);
  };

  function changeFilter(name, value) {
    setDate((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function UpdateData() {
    const fecthData = async () => {

      const newData = await bralimaData.map((el) => {
        return {
          name: el.name,
          data: {
            data: {
              data: {
                ...el,
                createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
              },
            },
          },
        };
      });

      const newData2 = { id: [...id], data: [...newData] };

      const newDataVente = {

        valeur: venteDego,
        createdAt: `${year}-${month}-${day}T07:22:54.930Z`,
      }
      setBralimadata(null);

      try {

        //response of our main array
        const response = await axios.post( `http://localhost:5001/api/v1/raportJournalier/autreProduit/${year}/${month}/${day}`, newData2 );

        const venteDegoResponse = await axios.post( `http://localhost:5001/api/v1/vente/${year}/${month}/${day}`, newDataVente );

        setVenteDego(venteDegoResponse.data.data.day.valeur);

        setBralimadata(
          response.data.data.day.map((el, index) => {
            return { ...el, id: index };
          })
        );
        setId(response.data.data.id);
      } catch (err) {
        if (err.message) {
          console.log(err);
        } else {
          console.log(err);
        }
      }
    };
    fecthData();
  };

  let displayDataMainExcel = null;
  let displayTdSuivi = null;
  if (bralimaData && bralimaData.length > 0) {
    displayTdSuivi = bralimaData.map((prev) => {
      return (
        <InputTd
          prev={prev}
          key={prev.id}
          onchange={handleTdFormInSuivi}
          toggleTd={providers}
        />
      );
    });
  
    displayDataMainExcel = bralimaData.map((prev) => {
      return (
        <ExcelMain
          prev={prev}
          key={prev.id}
          onchange={handleFormInStock}
          toggle={toggleStoc}
          readonly={readOnly}
        />
      );
    });

  };
  
  if (bralimaData) {
    if (bralimaData.length > 0) {

      return (
        <div>
          <DailyFilter
            prev={date}
            onclick={setFilterParams}
            onchange={changeFilter}
          />

          <label>Vente Journalière Dego</label>
          <input type="number" name="vente" onChange={ e => handleFormVenteDego (e.target.value)} placeholder="Vente Journalière Dego" defaultValue={venteDego}/>

          <ExcelSecLayout toggle={toggleStoc} data={displayDataMainExcel} />

          <button onClick={toggleBtn}>
            {!toggleStoc ? "Cacher" : "Afficher"}
          </button>

          {!update && (
            <button onClick={addProduct}> Ajouter un Product </button>
          )}

          <h1> Suivi Approvisinnemnt </h1>

          <TableSuivi
            readonly={readOnly}
            toggleSuivi={providers}
            tdData={displayTdSuivi}
            data={bralimaData}
            changeTh={handleThFormInSuivi}
          />

          <button onClick={AddProviders}>
            {!update
              ? "Afficher Ou Ajouter un Fournisseur"
              : "Afficher plus de Fournisseur"}{" "}
          </button>

          {!update ? (
            <button onClick={postData}> Enregistrer les Donnees </button>
          ) : (
            <button onClick={UpdateData}> Mettre à jour les données</button>
          )}

        </div>
      );
    } else {
      if (year === todayYear && month === todayMonth && day === todayDay) {
        return (
          <div>
            <DailyFilter
              prev={date}
              onclick={setFilterParams}
              onchange={changeFilter}
            />

            <button onClick={addProduct}> Ajouter un produit</button>

          </div>
        );
      } else {
        return (
          <div>
            <DailyFilter
              prev={date}
              onclick={setFilterParams}
              onchange={changeFilter}
            />

            <h3> Ooops la donnée de cette date est inexistante</h3>
            <h4> S'il vous plait veillez chercher une autre date </h4>
          </div>
        );
      }
    }
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}
