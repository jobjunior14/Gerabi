import { useDispatch } from "react-redux";
import { productActions } from "../store/AllProductManager-slice";
import { alimProductActions } from "../store/AllProductManagerAlim-slice";
import { suiviDepenseActions } from "../store/suiviDepense-slice";
import { suiviDetteActions } from "../store/suiviDette-slice";
import { mensRapportActions } from "../store/mensRepport-slice";
import useParamsGetter from "../reuseFunction/paramsGetter";
export default function DailyFilter ({prev, component, onclick}) {

    const dispatch = useDispatch();
    const {stateAction} = useParamsGetter();

    return (
        <div>
            <label className="mx-2">Année: </label>
            <input 
                value={prev.year}
                name = 'year'
                type="number"
                placeholder= "Taper l'année"
                onChange= { e => {
                    const {name, value} = e.target;
                    component === 'allProduct' ? 
                        !stateAction ? dispatch(alimProductActions.setDate({name: name, value: Number (value)})) : 
                        dispatch(productActions.setDate({name: name, value: Number (value)})) :
                    component ==='suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : 
                    component === 'daily' ? dispatch(mensRapportActions.setDate({name: name, value: Number (value)})) :
                    dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                    }}
                />

            <label className="mx-2"> Mois: </label>
            <input 
                value={prev.month}
                type="number"
                name = 'month'
                placeholder= "Taper le mois"
                onChange= { e => {
                    const {name, value} = e.target;
                    component === 'allProduct' ? 
                        !stateAction ? dispatch(alimProductActions.setDate({name: name, value: Number (value)})) : 
                        dispatch(productActions.setDate({name: name, value: Number (value)})) :
                    component ==='suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : 
                    component === 'daily' ? dispatch(mensRapportActions.setDate({name: name, value: Number (value)})) :
                    dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                    }}
                    />

            <label className="mx-2"> Jour: </label>
            <input 
                value={prev.day}
                name = 'day'
                type="number"
                placeholder= "Taper le jour"
                onChange= { e => {
                    const {name, value} = e.target;
                    component === 'allProduct' ? 
                        !stateAction ? dispatch(alimProductActions.setDate({name: name, value: Number (value)})) : 
                        dispatch(productActions.setDate({name: name, value: Number (value)})) :
                    component ==='suiviDepense' ? dispatch(suiviDepenseActions.setDate({name: name, value: Number (value)})) : 
                    component === 'daily' ? dispatch(mensRapportActions.setDate({name: name, value: Number (value)})) :
                    dispatch(suiviDetteActions.setDate({name: name, value: Number (value)}));
                }}
            />

            <button onClick={onclick} > Chercher </button>
        </div>
    );

}