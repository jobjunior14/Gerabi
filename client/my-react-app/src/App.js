import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MensualRapHome from './components/pages/rapMensuel/homepage';
import { YearMensRep } from './components/pages/rapMensuel/yearPage';
import { MonthMensRep } from './components/pages/rapMensuel/month';
import { Bralima } from './components/Daily-Report/Bralima';
import { MainNav } from './components/headers/outlet';
import { ProductNav } from './components/headers/outlet';

function App() {
  return ( 

    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<MainNav/>}>


        <Route path='/rapportJournalier' element = {<ProductNav/>}>
          <Route  path={`bralima`} index element = {<Bralima produit = 'bralima'/>}/>
          <Route path='brasimba' element = {<Bralima produit = 'brasimba'/>}/>
          <Route path='autreProdut' element = {<Bralima produit = 'autreProduit'/>}/>
          <Route path='liqueurs' element = {<Bralima produit = 'liqueurs'/>}/>
        </Route>

        <Route path='rapportMensuel' element = {<MensualRapHome/>}/>
        
      </Route>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
