/* eslint-disable react/prop-types */

export default function MensFilter ({prev, onclick, onchange}) {
        
    return (
        <div className=" flex items-center justify-center mb-5 mt-8">
            <div className="relative">

                <label className=" absolute bottom-7 z-40 bg-gray-100 dark:bg-zinc-800 dark:text-gray-50 left-4 rounded-full text-ms"> Année</label>
                <input
                    className="w-16 mx-2 h-10 pl-2 bg-gray-100 dark:bg-zinc-800 dark:text-gray-50 appearance-none border-2 border-gray-400 rounded-md focus:outline-none focus:border-indigo-500 focus:border-2 duration-200"
                    value={prev.year}
                    name = 'year'
                    type="number"
                    placeholder= "Taper l'année"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return onchange(name, value)
                    }}
                />
            </div>
            <div className="relative">

                <label className=" absolute bottom-7 z-40 bg-gray-100 dark:bg-zinc-800 dark:text-gray-50 left-4 rounded-full text-ms"> Mois </label>
                <input
                    className="w-16 mx-2 h-10 pl-2 bg-gray-100 dark:bg-zinc-800 dark:text-gray-50 appearance-none border-2 border-gray-400 rounded-md focus:outline-none focus:border-indigo-500 focus:border-2 duration-200" 
                    value={prev.month}
                    name = 'month'
                    type="number"
                    placeholder= "Taper le mois"
                    onChange= { e => {
                        const {name, value} = e.target;
                        return onchange(name, value)
                    }}
                />
            </div>


            <button 
                className="bg-gray-500 duration-200 text-gray-50 p-2 rounded-lg mx-6 hover:bg-gray-600 focus:bg-gray-800 "
                onClick={onclick}
            >Chercher</button>
        </div>
    );
   

}