import { suiviDetteActions } from "../../store/suiviDette-slice";
import { useDispatch, useSelector } from "react-redux";

export default function TotDetteDaily (props) {
    const totDette = useSelector(state => state.suiviDette.totalDette);

    return (<p> Total dette du {props.day}-{props.month}-{props.year} : <b> {totDette} </b> </p>)
};