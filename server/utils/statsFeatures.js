class stats 
{
    constructor(year, month, venteBar, approvisionnement, benefice, name)
    {
        this.year = year;
        this.month = month;
        this.venteBar = venteBar;
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
                vente_bar: this.venteBar,
                approvionnement: this.approvionnement ,
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
            vente_bar: this.venteBar,
            approvionnement: this.approvionnement,
            benefice: this.benefice
        }

        return statsObj;
    } 
};

module.exports = stats;