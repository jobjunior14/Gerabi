import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from '../src/components/Daily-Report/Stock_Consignation/AllProductManager'
import { MainNav, DailyRepportNav, MensRepportNav } from './components/headers/outlet';
import SuiviDepense from './components/Daily-Report/suiviDepense/suiviDepense'
import SuiviDette from './components/Daily-Report/suiviDette/suiviDette';
import { MensRepport } from './components/Mensuel Report/mensual&DailyReport';
import HouseRoutes from './components/headers/degoBarHeaders';
import YearStats from './components/stats/yearStats';
function App() {

  const degoBar = {
    sliceName: 'product',
    componentName: 'degoBar',
    venteName: 'venteDego'
  };
  const alimentation = {
    sliceName: 'alimProduct',
    componentName: 'alimentation',
    venteName: 'venteAlimentation'
  };

  return ( 
    
    <BrowserRouter>
      <Routes>
        
          <Route path='/' element = {<MainNav/>}>

            <Route path='/rapportJournalier' element = {<DailyRepportNav/>}>

              <Route path='degoBar' element = {<HouseRoutes component = 'degoBar'/>}/>
    
                <Route  path='rapportJournalier/:componentName/product/:productName' element = {<Product />}/>
                <Route path ='degoBar/suiviDette' element = {<SuiviDette />}/>
                <Route path = 'degoBar/suiviDepense' element = {<SuiviDepense {...degoBar}/>}/>
                <Route path='degoBar/dailyRepport' element = {<MensRepport componentName = 'degoBar' user = 'dailyRap'/>}/>

              <Route path='alimentation' element = {<HouseRoutes component = 'alimentation'/>}/>
                <Route  path=':componentName/product/:productName' element = {<Product {...alimentation} productName = 'bralima'/>}/>
                <Route path ='alimentation/suiviDette' element = {<SuiviDette {...alimentation}/>}/>
                <Route path = 'alimentation/suiviDepense' element = {<SuiviDepense {...alimentation}/>}/>
                <Route path='alimentation/dailyRepport' element = {<MensRepport componentName = 'alimentation' user = 'dailyRap'/>}/>
            </Route>

            <Route path='rapportMensuel' element = {<MensRepportNav/>}>
              <Route path='degoBar' element = {<MensRepport componentName = 'degoBar' user = 'rappMens' />}/>
              <Route path='alimentation' element = {<MensRepport componentName = 'alimentation' user = 'rappMens'/>}/>
              <Route path='graphique' element = {<YearStats/>} />
            </Route>
            
          </Route>
      </Routes>

    </BrowserRouter>


  );
}

export default App;
