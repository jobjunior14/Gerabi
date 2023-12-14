import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import AllProductGraph from "./allProducts";

export default function VenteSystemGraph (props)  {

    const degoBar = 'degoBar';
    const alimentation = 'alimentation';
    
    return (
        <div>
            <h2>Dego Bar</h2>
            <AllProductGraph componentName = {degoBar} productName = 'bralima'  />
            <AllProductGraph componentName = {degoBar} productName = 'brasimba' />
            <AllProductGraph componentName = {degoBar} productName = 'liqueurs' />
            <AllProductGraph componentName = {degoBar} productName = 'autreProduit'/>
            <h2>Alimentation</h2>
            <AllProductGraph componentName = {alimentation} productName = 'bralima'  />
            <AllProductGraph componentName = {alimentation} productName = 'brasimba' />
            <AllProductGraph componentName = {alimentation} productName = 'liqueurs' />
            <AllProductGraph componentName = {alimentation} productName = 'autreProduit'/>
        </div>
    )
};