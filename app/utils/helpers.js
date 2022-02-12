module.exports = {
    /** Capitalize first character of string */
    capitalize: string => `${string.charAt(0).toUpperCase() + string.slice(1)}`,
    /** computes paginated meta **/
    computePaginationMeta: ({ page, limit, count }) => {
        return {
            currentPage: page,
            limit,
            total: count
        };
    },
    /**
     * set pagination data from query string of parameter
     */
    makePaginationDataFromRequest: req => {
        let paginateData = {};

        if (req.query.page) {
            paginateData['page'] = req.query.page;

            if (req.query.limit) {
                paginateData['limit'] = parseInt(req.query.limit);
            }
        }
        return paginateData;
    }
};
