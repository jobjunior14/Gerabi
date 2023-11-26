import React from "react";
export default function formatDate (year, month, day) {
    let createdAt = `${year}-${month}-${day}T07:22:54.930Z`;

    //set date to the rigth format
    if ( month >= 10 && day >= 10){
       createdAt = `${year}-${month}-${day}T07:22:54.930Z`;
    } else if (month >= 10 && day < 10) {
        createdAt = `${year}-${month}-0${day}T07:22:54.930Z`;       
    } else if (month < 10 && day >= 10) {
        createdAt = `${year}-0${month}-${day}T07:22:54.930Z`;     
    } else {
        createdAt = `${year}-0${month}-0${day}T07:22:54.930Z`;
    };

    return createdAt;
}