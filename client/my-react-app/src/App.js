import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MensualRapHome from './components/pages/rapMensuel/homepage';
import { YearMensRep } from './components/pages/rapMensuel/yearPage';
import { MonthMensRep } from './components/pages/rapMensuel/month';
import { Bralima } from './components/Daily-Report/Bralima';
import { MainNav } from './components/headers/outlet';
import { ProductNav } from './components/headers/outlet';
import { TableSuivi } from './components/Daily-Report/suiviAppro/mainTable';
function App() {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<MainNav/>}>

        <Route path='/rapportJournalier' element = {<ProductNav/>}>
          <Route  path='bralima' index element = {<Bralima/>}/>
          <Route path='brasimba' element = {<h1>Hey Brasimba</h1>}/>
          <Route path='autreProdut' element = {<h1>Hey Autre Produit</h1>}/>
          <Route path='liqueurs' element = {<TableSuivi/>}/>
        </Route>

        <Route path='rapportMensuel' element = {<MensualRapHome/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
