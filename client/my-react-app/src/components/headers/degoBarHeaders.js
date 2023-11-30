import { Link} from 'react-router-dom';
import React   from 'react';

export default function HouseRoutes (props)
{
    return (
        <div>
            <Link to = {`/rapportJournalier/${props.component}/bralima?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> <button> Bralima</button> </Link>
            <Link to = {`/rapportJournalier/${props.component}/brasimba?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> <button>Brasimba</button> </Link>
            <Link to = {`/rapportJournalier/${props.component}/autreProdut?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> <button> Autre Produit</button> </Link>
            <Link to = {`/rapportJournalier/${props.component}/liqueurs?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> <button> Liqueurs</button> </Link>
            <Link to = {`/rapportJournalier/${props.component}/suiviDette?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> <button> Suivi Dette </button> </Link>
            <Link to = {`/rapportJournalier/${props.component}/suiviDepense?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> <button> Suivi Depense</button> </Link>
            <Link to = {`/rapportJournalier/${props.component}/dailyRepport?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> <button> Rapport Journalier </button> </Link>
        </div>
    );
};