import { useState } from "react";
import VenteSystemGraph from "./yearStats/venteSystem/venteSysteme";
import useDateParams from '../reuseFunction/dateParams'
import searchImage from '../../assets/searchImage.png';
import MensFilter from "../filter/filterMensRap";
import No_ExistentDate from "../errorPages/no_existantDate";
import LoadingError from "../errorPages/LoadingError";

export default function YearStats () {

    const {year,month, currentYear, setterDateParams} = useDateParams();
    //stock the changed date
    const [date, setDate] = useState({year, month});

    //define the width of the graphic
    const [graphicWidth, setGraphicWidth] = useState(400);

    function setFilterParams  () {
        setterDateParams(date);
    }

    function handleDate (name, value) {
        setDate (prev => ({...prev, [name]: Number (value)}));
    }

    function handleGraphicWidth (value) {
        setGraphicWidth(value);
    }

    //check if the graphic's width is > 100
    const checkWidth = graphicWidth < 300 || graphicWidth > 600;

    if (year > currentYear)  {

        return (<No_ExistentDate/>);
    } else {
        return (
            <div>
                <MensFilter prev = {date} onclick={setFilterParams} onchange={handleDate} />
                <div>
                    <label className={`font-bold ${!checkWidth ? "text-indigo-600" : 'text-red-500'} mr-4`} name="width" id='width'> Taille Des Graphiques: </label>
                    <input 
                        className="h-7 w-28 bg-slate-400 appearance-none rounded-lg pl-2 hover:border-indigo-400 border-2 focus:bg-slate-500 text-white foucus:boder-2 focus:border-indigo-400 focus:outline-none border-gray-500 duration-200"
                        type="number"
                        defaultValue = {graphicWidth} 
                        id="width" 
                        name="width" 
                        onChange= {(e) => handleGraphicWidth(Number(e.target.value))} 
                        placeholder="100-500"
                    />
                    {checkWidth && <p className="text-red-600"> La taille des graphiques ne peut etre {"<"} à 100 ou {">"} à 500</p>}
                </div>
                <VenteSystemGraph checkWidth = {checkWidth} graphicWidth = {graphicWidth}/>
            </div>

        );
    }

}