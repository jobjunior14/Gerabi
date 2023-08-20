class apiFeatures 
{
    constructor(query, reqQuery)
    {
        this.query = query;
        this.reqQuery = reqQuery;
    }
    filter()
    {
        const queryOBJ = {...this.reqQuery}
        const excludeFields = ['page', 'limit', 'fields', 'sort'];
        excludeFields.forEach ( el => delete queryOBJ[el] );

        //Advanced Filtering
        let queryString = JSON.stringify( queryOBJ );
        queryString = queryString.replace (/\b(gte|gt|lt|lte)\b/g, match => `$${match}`)
        
        //Sort
        const sortStr = (this.reqQuery.sort) ? this.reqQuery.sort : '-createAt';

        //Limiting
        const fields = (this.reqQuery.fields) ? this.reqQuery.fields.split(',').join(' ') : null;
        const limitingStr = (this.reqQuery.fields) ? fields : ('-__v');
        
        //Pagination
        const page = Number(this.reqQuery.page) || 1;
        const limit = Number(this.reqQuery.limit) || 5;
        const skip = ( page - 1) * limit;

        
        //EXECUTE QUERY OBJECT
        this.query = this.query
            .find(JSON.parse(queryString))
            .sort(sortStr)
            .select(limitingStr)
            .skip(skip)
            .limit(limit);

        return  this.query;
    }
}

module.exports = apiFeatures;