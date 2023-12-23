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

  return ( 
    
    <BrowserRouter>
      <Routes>
        
          <Route path='/' element = {<MainNav/>}>

            <Route path='/rapportJournalier' element = {<DailyRepportNav/>}>

              <Route path='degoBar' element = {<HouseRoutes component = 'degoBar'/>}/>
    
                <Route  path=':componentName/product/:productName' element = {<Product />}/>
                <Route path = ':componentName/suiviDepense' element = {<SuiviDepense />}/>
                <Route path =':componentName/suiviDette' element = {<SuiviDette />}/>
                <Route path=':componentName/dailyRepport' element = {<MensRepport componentName = 'degoBar' user = 'dailyRap'/>}/>

              <Route path='alimentation' element = {<HouseRoutes component = 'alimentation'/>}/>
                <Route  path=':componentName/product/:productName' element = {<Product/>}/>
                <Route path = ':componentName/suiviDepense' element = {<SuiviDepense />}/>
                <Route path =':componentName/suiviDette' element = {<SuiviDette />}/>
                <Route path=':componentName/dailyRepport' element = {<MensRepport componentName = 'alimentation' user = 'dailyRap'/>}/>
            </Route>

            <Route path='/rapportMensuel' element = {<MensRepportNav/>}>
              <Route path='products/:componentName' element = {<MensRepport user = 'rappMens' />}/>
              <Route path='graphique' element = {<YearStats/>} />
            </Route>
            
          </Route>
      </Routes>

    </BrowserRouter>


  );
}

export default App;
