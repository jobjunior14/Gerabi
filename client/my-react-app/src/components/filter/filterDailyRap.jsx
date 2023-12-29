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
        <div className=" flex items-center justify-center mb-5 mt-8">

                <div className="relative">
                    <label className=" absolute bottom-7 z-40 bg-gray-100 left-4 rounded-full text-ms">Année: </label>
                    <input 
                        className="w-16 mx-2 h-10 pl-2 bg-gray-100 appearance-none border-2 border-gray-400 rounded-md focus:outline-none focus:border-indigo-500 focus:border-2 duration-200"
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
                </div>
                
                <div className="relative">

                    <label className=" absolute bottom-7 z-40 bg-gray-100 left-4 rounded-full text-ms"> Mois: </label>
                    <input 
                        className="w-16 mx-2 h-10 pl-2 bg-gray-100 appearance-none border-2 border-gray-400 rounded-md focus:outline-none focus:border-indigo-500 focus:border-2 duration-200"
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
                </div>
                
                <div className="relative">
                    <label className=" absolute bottom-7 z-40 bg-gray-100 left-4 rounded-full text-ms"> Jour: </label>
                    <input 
                        className="w-16 mx-2 h-10 pl-2 bg-gray-100 appearance-none border-2 border-gray-400 rounded-md focus:outline-none focus:border-indigo-500 focus:border-2 duration-200"
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
                </div>

                <button 
                    onClick={onclick} 
                    className="bg-gray-500 duration-200 text-gray-50 p-2 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                > Chercher </button>

        </div>
    );

}