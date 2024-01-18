import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from '../src/components/Daily-Report/Stock_Consignation/AllProductManager'
import { MainNav, DailyRepportNav, MensRepportNav } from './components/headers/outlet';
import SuiviDepense from './components/Daily-Report/suiviDepense/suiviDepense'
import SuiviDette from './components/Daily-Report/suiviDette/suiviDette';
import { MensRepport } from './components/Mensuel Report/mensual&DailyReport';
import YearStats from './components/stats/yearStats';
import { HouseNav } from './components/headers/outlet';
import Documentation from './components/documentation';
import Login from './components/user/login';
import Signup from './components/user/signup';
import NotFound from '../src/components/errorPages/notFound';
function App() {

  return ( 
    <div className='w-full'>
      <BrowserRouter>
        <Routes>
          
            <Route path='/' element = {<MainNav/>}>

              <Route path='/rapportJournalier' element = {<DailyRepportNav/>}>

                <Route path=':componentName' element = {<HouseNav />}>
                  <Route path='product/:productName' element = {<Product />}/>
                  <Route path = 'suiviDepense' element = {<SuiviDepense />}/>
                  <Route path ='suiviDette' element = {<SuiviDette />}/>
                  <Route path='dailyRepport' element = {<MensRepport user = 'dailyRap'/>}/>
                </Route>

              </Route>

              <Route path='/rapportMensuel' element = {<MensRepportNav/>}>
                <Route path='products/:componentName' element = {<MensRepport user = 'rappMens' />}/>
                <Route path='graphique' element = {<Signup/>} />
              </Route>
              <Route path='/documentation' element= {<Documentation/>}/>
              
            </Route>
            <Route path='*' element= {<NotFound/>}/>
        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App
