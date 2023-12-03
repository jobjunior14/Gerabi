import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import VenteSystemGraph from "./yearStats/venteSystem/venteSysteme";

export default function YearStats () {

    const [dateParams, setDateParams] = useSearchParams();

    const year = dateParams.get('year');

    const [date, setDate] = useState(year);

    


}