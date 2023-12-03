import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from '../src/components/Daily-Report/degoBar/Stock_Consignation/AllProductManager'
import { MainNav, DailyRepportNav, MensRepportNav } from './components/headers/outlet';
import SuiviDepense from './components/Daily-Report/degoBar/suiviDepense/suiviDepense'
import SuiviDette from './components/Daily-Report/degoBar/suiviDette/suiviDette';
import { MensRepport } from './components/Mensuel Report/mensual&DailyReport';
import HouseRoutes from './components/headers/degoBarHeaders';
import Graphique from './components/stats/graphiques'

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

              <Route path='degoBar' element = {<HouseRoutes component = 'degoBar'/>}/>
                <Route  path='degoBar/bralima' element = {<Product {...degoBar} produit = 'bralima'/>}/>
                <Route path='degoBar/brasimba' element = {<Product {...degoBar} produit = 'brasimba'/>}/>
                <Route path='degoBar/autreProdut' element = {<Product {...degoBar} produit = 'autreProduit'/>}/>
                <Route path='degoBar/liqueurs' element = {<Product {...degoBar} produit = 'liqueurs'/>}/>
                <Route path ='degoBar/suiviDette' element = {<SuiviDette {...degoBar}/>}/>
                <Route path = 'degoBar/suiviDepense' element = {<SuiviDepense {...degoBar}/>}/>
                <Route path='degoBar/dailyRepport' element = {<MensRepport componentName = 'degoBar' user = 'dailyRap'/>}/>

              <Route path='alimentation' element = {<HouseRoutes component = 'alimentation'/>}/>
                <Route  path='alimentation/bralima' element = {<Product {...alimentation} produit = 'bralima'/>}/>
                <Route path='alimentation/brasimba' element = {<Product {...alimentation} produit = 'brasimba'/>}/>
                <Route path='alimentation/autreProdut' element = {<Product {...alimentation} produit = 'autreProduit'/>}/>
                <Route path='alimentation/liqueurs' element = {<Product {...alimentation} produit = 'liqueurs'/>}/>
                <Route path ='alimentation/suiviDette' element = {<SuiviDette {...alimentation}/>}/>
                <Route path = 'alimentation/suiviDepense' element = {<SuiviDepense {...alimentation}/>}/>
                <Route path='alimentation/dailyRepport' element = {<MensRepport componentName = 'alimentation' user = 'dailyRap'/>}/>
            </Route>

            <Route path='rapportMensuel' element = {<MensRepportNav/>}>
              <Route path='degoBar' element = {<MensRepport componentName = 'degoBar' user = 'rappMens' />}/>
              <Route path='alimentation' element = {<MensRepport componentName = 'alimentation' user = 'rappMens'/>}/>
              <Route path='graphique' element = {<h1> Hello Graphique</h1>} />
            </Route>
            
          </Route>
      </Routes>

    </BrowserRouter>


  );
}

export default App;
