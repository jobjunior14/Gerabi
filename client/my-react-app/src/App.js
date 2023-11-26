import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from '../src/components/Daily-Report/degoBar/Stock_Consignation/AllProductManager'
import { MainNav, DegoBarNav, AlimNav, DailyRepportNav } from './components/headers/outlet';
import SuiviDepense from './components/Daily-Report/degoBar/suiviDepense/suiviDepense'
import SuiviDette from './components/Daily-Report/degoBar/suiviDette/suiviDette';
import { MensRepportNav } from './components/headers/outlet';
import { MensRepport } from './components/Mensuel Report/mensualReport';

function App() {
  const degoBar = {
    sliceName: 'product',
    componentName: 'degoBar',
    vente: 'venteDego'
  };
  const alimentation = {
    sliceName: 'alimProduct',
    componentName: 'alimentation',
    vente: 'venteAlimentation'
  };

  return ( 
    
    <BrowserRouter>
      <Routes>
        
          <Route path='/' element = {<MainNav/>}>

            <Route path='rapportJournalier' element = {<DailyRepportNav/>}>

              <Route path='degoBar' element = {<DegoBarNav/>}>
                <Route  path='bralima' element = {<Product {...degoBar} produit = 'bralima'/>}/>
                <Route path='brasimba' element = {<Product {...degoBar} produit = 'brasimba'/>}/>
                <Route path='autreProdut' element = {<Product {...degoBar} produit = 'autreProduit'/>}/>
                <Route path='liqueurs' element = {<Product {...degoBar} produit = 'liqueurs'/>}/>
                <Route path ='suiviDette' element = {<SuiviDette {...degoBar}/>}/>
                <Route path = 'suiviDepense' element = {<SuiviDepense {...degoBar}/>}/>
              </Route>

              <Route path='alimentation' element = {<AlimNav/>}>
                <Route  path='bralima' element = {<Product {...alimentation} produit = 'bralima'/>}/>
                <Route path='brasimba' element = {<Product {...alimentation} produit = 'brasimba'/>}/>
                <Route path='autreProdut' element = {<Product {...alimentation} produit = 'autreProduit'/>}/>
                <Route path='liqueurs' element = {<Product {...alimentation} produit = 'liqueurs'/>}/>
                <Route path ='suiviDette' element = {<SuiviDette {...alimentation}/>}/>
                <Route path = 'suiviDepense' element = {<SuiviDepense {...alimentation}/>}/>
              </Route>

            </Route>

            <Route path='rapportMensuel' element = {<MensRepportNav/>}>
              <Route path='degoBar' element = {<MensRepport componentName = 'degoBar'/>}/>
              <Route path='alimentation' element = {<MensRepport componentName = 'alimentation'/>}/>
            </Route>
            
          </Route>
      </Routes>

    </BrowserRouter>


  );
}

export default App;
