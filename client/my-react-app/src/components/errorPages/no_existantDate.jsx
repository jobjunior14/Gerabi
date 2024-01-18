import searchImage from '../../../../assets/searchImage.png'
export default function No_ExistentDate () {
    return (<div className="m-4">
        <h3 className="lg:text-2xl text-xl font-semibold text-gray-700"> VENTE BAR</h3>
        <div className=" flex items-center justify-center h-3/4 ">
            <img className=" h-80 w-auto" src={searchImage} alt="search image" />
        </div>
        <h4 className="lg:text-3xl text-2xl text-gray-700 ">Ouuppss!! cette date n&apos;a pas des données</h4>
    </div>);
}