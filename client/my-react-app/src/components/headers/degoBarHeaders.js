import { Link} from 'react-router-dom';
import React   from 'react';

export default function HouseRoutes (props)
{
    return (
        <div>
            <Link to = {`/rapportJournalier/${props.component}/product/bralima?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Bralima </Link>
            <Link to = {`/rapportJournalier/${props.component}/product/brasimba?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}>Brasimba </Link>
            <Link to = {`/rapportJournalier/${props.component}/product/autreProduit?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Autre Produit </Link>
            <Link to = {`/rapportJournalier/${props.component}/product/liqueurs?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Liqueurs </Link>
            <Link to = {`/rapportJournalier/${props.component}/suiviDette?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}>  Suivi Dette </Link>
            <Link to = {`/rapportJournalier/${props.component}/suiviDepense?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Suivi Depense </Link>
            <Link to = {`/rapportJournalier/${props.component}/dailyRepport?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()} `}> Rapport Journalier </Link>
        </div>
    );
};