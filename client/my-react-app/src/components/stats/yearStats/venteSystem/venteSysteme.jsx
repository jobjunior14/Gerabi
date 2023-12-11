import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import AllProductGraph from "./allProducts";

export default function VenteSystemGraph (props)  {

    
    return (
        <div>
            <h2>Dego Bar</h2>
            <AllProductGraph componentName = 'degoBar' productName = 'bralima'  />
            <AllProductGraph componentName = 'degoBar' productName = 'brasimba' />
            <AllProductGraph componentName = 'degoBar' productName = 'liqueurs' />
            <AllProductGraph componentName = 'degoBar' productName = 'autreProduit'/>
        </div>
    )
};