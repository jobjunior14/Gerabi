import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MensualRapHome from './components/pages/rapMensuel/homepage';
import { YearMensRep } from './components/pages/rapMensuel/yearPage';
import { MonthMensRep } from './components/pages/rapMensuel/month';
import Product from './components/Daily-Report/AllProductManager';
import { MainNav } from './components/headers/outlet';
import { ProductNav } from './components/headers/outlet';

function App() {
  return ( 

    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<MainNav/>}>


        <Route path='/rapportJournalier' element = {<ProductNav/>}>
          <Route  path={`bralima`} index element = {<Product produit = 'braliam'/>}/>
          <Route path='brasimba' element = {<Product produit = 'brasimba'/>}/>
          <Route path='autreProdut' element = {<Product produit = 'autreProduit'/>}/>
          <Route path='liqueurs' element = {<Product produit = 'liqueurs'/>}/>
        </Route>

        <Route path='rapportMensuel' element = {<MensualRapHome/>}/>
        
      </Route>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
