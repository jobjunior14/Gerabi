import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from '../src/components/Daily-Report/degoBar/Stock_Consignation/AllProductManager'
import { MainNav, DegoBarNav, AlimNav, DailyRepportNav } from './components/headers/outlet';
import SuiviDesVentes from './components/Mensuel Report/suivi_Des_Ventes/suiviDesVentes';
import SuiviDepense from './components/Daily-Report/degoBar/suiviDepense/suiviDepense'
import SuiviDette from './components/Daily-Report/degoBar/suiviDette/suiviDette';

function App() {
  return ( 
    
    <BrowserRouter>
      <Routes>
        
          <Route path='/' element = {<MainNav/>}>

            <Route path='rapportJournalier' element = {<DailyRepportNav/>}>

              <Route path='degoBar' element = {<DegoBarNav/>}>
                <Route  path='bralima' element = {<Product sliceName = 'product' componentName = "degoBar" vente = 'venteDego' produit = 'bralima'/>}/>
                <Route path='brasimba' element = {<Product sliceName = 'product' componentName = "degoBar" vente = 'venteDego' produit = 'brasimba'/>}/>
                <Route path='autreProdut' element = {<Product sliceName = 'product' componentName = "degoBar" vente = 'venteDego' produit = 'autreProduit'/>}/>
                <Route path='liqueurs' element = {<Product sliceName = 'product' componentName = "degoBar" vente = 'venteDego' produit = 'liqueurs'/>}/>
                <Route path ='suiviDette' element = {<SuiviDette sliceName = 'product' componentName = 'degoBar'/>}/>
                <Route path = 'suiviDepense' element = {<SuiviDepense sliceName = 'product' componentName = 'degoBar'/>}/>
              </Route>

              <Route path='alimentation' element = {<AlimNav/>}>
                <Route  path='bralima' element = {<Product sliceName = 'alimProduct' componentName = "alimentation" vente = 'venteAlimentation' produit = 'bralima'/>}/>
                <Route path='brasimba' element = {<Product sliceName = 'alimProduct' componentName = "alimentation" vente = 'venteAlimentation' produit = 'brasimba'/>}/>
                <Route path='autreProdut' element = {<Product sliceName = 'alimProduct' componentName = "alimentation" vente = 'venteAlimentation' produit = 'autreProduit'/>}/>
                <Route path='liqueurs' element = {<Product sliceName = 'alimProduct' componentName = "alimentation" vente = 'venteAlimentation' produit = 'liqueurs'/>}/>
                <Route path ='suiviDette' element = {<SuiviDette sliceName = 'alimProduct' componentName = 'alimentation'/>}/>
                <Route path = 'suiviDepense' element = {<SuiviDepense sliceName = 'alimProduct' componentName = 'alimentation'/>}/>
              </Route>

            </Route>

            <Route path='rapportMensuel' element = {<SuiviDesVentes/>}/>
            
          </Route>
      </Routes>

    </BrowserRouter>


  );
}

export default App;
