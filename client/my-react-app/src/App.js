import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MensualRapHome from './components/pages/rapMensuel/homepage';
import { YearMensRep } from './components/pages/rapMensuel/yearPage';
import { MonthMensRep } from './components/pages/rapMensuel/month';

function App() {
  return ( 
    <BrowserRouter>
    <header>
      <Link to= '/rapportMensuel'>Rapport Mensuel</Link>
      <nav>
        <Link to= "/rapportJournalier">Rapport Journalier</Link>
      </nav>
    </header>
    <Routes>
      <Route path='/rapportMensuel' element= {<MensualRapHome/>}>
        
      </Route>

      <Route path='/rapportMensuel/:year' element = {<YearMensRep/>}/>
      <Route path='/rapportMensuel/:year/:month' element = {<MonthMensRep/>}/>

    



      <Route path='/rapportJournalier' element = {<h1>Journalier</h1>}>

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
