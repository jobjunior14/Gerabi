import { createContext, useContext, useState } from "react";

const ObjContext = createContext(undefined);

export const ObjProvider = ({children}) => {

    const obj = 'hey';
     
    return <ObjContext.Provider value={{obj}}></ObjContext.Provider>;
};

export const UseObj = () => useContext(ObjContext);