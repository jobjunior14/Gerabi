class apiFeatures 
{
    constructor(query, reqQuery)
    {
        this.query = query;
        this.reqQuery = reqQuery;
    }
    filter()
    {
        const year = Number ( this.reqQuery.date.slice(0, 4));
        const month = Number (this.reqQuery.date.slice(4, 6));
        this.query = this.query.filter(
            el =>
            {
                return el.data.filter(
                    el =>
                    {
                        return el.annee === year
                    }
                )
            }
        );
        
        return  this.query;
    }
}

module.exports = apiFeatures;