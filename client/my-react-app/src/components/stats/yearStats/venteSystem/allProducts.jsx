import React from "react";
import Graphique from "../../graphiques";
import { useEffect } from "react";
export default function AllProductGraph (props) {

    const venteBar = [];
    const approvisionnement = [];
    const benefice = [];
    
    useEffect(() => {

        if (props.data) {
            if (props.data.length > 0) {
                for (let i of props.data) {
                    venteBar.push(i.vente_bar);
                    approvisionnement.push(i.approvisionnement);
                    benefice.push(i.benefice);
                }
            }
        };
    }, [props.data]);

    if (props.data) {

    } else {
        
    }
}