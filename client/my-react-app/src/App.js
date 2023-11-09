import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from './components/Daily-Report/Stock_Consignation/AllProductManager';
import { MainNav } from './components/headers/outlet';
import { ProductNav } from './components/headers/outlet';
import SuiviDesVentes from './components/Mensuel Report/suivi_Des_Ventes/suiviDesVentes';
import SuiviDepense from './components/Daily-Report/suiviDepense/suiviDepense';
import SuiviDette from './components/Daily-Report/suiviDette/suiviDette';

function App() {
  return ( 
    
    <BrowserRouter>
      <Routes>
        
          <Route path='/' element = {<MainNav/>}>

            <Route path='/rapportJournalier' element = {<ProductNav/>}>
              <Route  path='bralima' element = {<Product produit = 'bralima'/>}/>
              <Route path='brasimba' element = {<Product produit = 'brasimba'/>}/>
              <Route path='autreProdut' element = {<Product produit = 'autreProduit'/>}/>
              <Route path='liqueurs' element = {<Product produit = 'liqueurs'/>}/>
            </Route>

            <Route path='rapportMensuel' element = {<SuiviDette/>}/>
            
          </Route>
      </Routes>

    </BrowserRouter>


  );
}

export default App;
