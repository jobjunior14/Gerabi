import { useSearchParams } from "react-router-dom";

export default function useDateParams () {

    const [dateParams, setDateParams] = useSearchParams();

    const year = Number(dateParams.get("year"));
    const month = Number(dateParams.get("month"));
    const day = Number(dateParams.get("day"));
    //getting the current date
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    //boolen value to check the current date and the query parameters
    const dateState = year === currentYear && month === currentMonth && day === currentDay;

    function setterDateParams (date) {
        setDateParams(prev => date);
    }

    return {year, month, day, currentDay, currentMonth, currentYear, dateState, setterDateParams};
}