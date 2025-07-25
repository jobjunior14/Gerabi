class stats 
{
    constructor(year, month, mensRapport, approvisionnement, benefice, name)
    {
        this.year = year;
        this.month = month;
        this.mensRapport = mensRapport;
        this.approvisionnement = approvisionnement;
        this.benefice = benefice;
        this.name = name;
    }

    create()
    {
        const statsObj = 
        {
            annee: JSON.stringify(this.year).slice (1, 5) + this.name,
            data:[{
                mois: JSON.stringify(this.month).slice (6, 8) + this.name,
                vente_bar: this.mensRapport,
                approvisionnement: this.approvisionnement ,
                benefice: this.benefice,
            }]
        };

        return statsObj;
    }

    pushData()
    {
        const statsObj = 
        {
            mois: this.month,
            vente_bar: this.mensRapport,
            approvisionnement: this.approvisionnement,
            benefice: this.benefice
        }

        return statsObj;
    } 
};

module.exports = stats;