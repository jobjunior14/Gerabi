export function dateSetter  (array) {
    const month = [];
    for (let i of array) {
        if (i._id.mois === 1) {
            month.push('Janvier');
        } else if (i._id.mois === 2) {
            month.push('Fevrier');
        } else if (i._id.mois === 3) {
            month.push('Mars');
        } else if (i._id.mois === 4) {
            month.push('Avril');
        } else if (i._id.mois === 5) {
            month.push('Mai');
        } else if (i._id.mois === 6) {
            month.push('Juin');
        } else if (i._id.mois === 7) {
            month.push('Jouillet');
        } else if (i._id.mois === 8) {
            month.push('Aout');
        } else if (i._id.mois === 9) {
            month.push('Septembre');
        } else if (i._id.mois === 10) {
            month.push('Octobre');
        } else if (i._id.mois === 11) {
            month.push('Novembre');
        } else {
            month.push('Decembre');
        };
    };

    return month;
};

export function comparaisonDataApex({autreProduit, bralima, brasimba, liqueurs}, path) {
    return [
        {
            name: 'Autre Produit',
            data: autreProduit ? autreProduit[path] : []
        },
        {
            name: 'Brasimba',
            data: brasimba ? brasimba[path] : []
        },
        {
            name: 'Bralima',
            data: bralima ? bralima[path] : []
        },
        {
            name: 'Liqueurs',
            data: liqueurs ? liqueurs[path] : []
        },
    ]
}