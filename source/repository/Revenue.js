const Revenue = require('../model/Revenue')

/**
 * Represents a CRUD for Revenue.
 */
class RevenueRepository {
    insert(newRevenue) {
        /**
         * Insert a revenue into the table.
         * @param newRevenue The revenue to be inserted into.
         */
        return Revenue.create({
            value: newRevenue.value,
            title: newRevenue.title
        })
    }

    update(revenue, revenueId) {
        /**
         * Update a revenue.
         * @param revenue The revenue to be updated.
         * @param revenueId The revenue's id to search for.
         */
        return Revenue.update({
            value: revenue.value,
            title: revenue.title
        }, {
            where: {
                id: revenueId
            }
        })
    }

    deleteById(revenueId) {
        /**
         * Delete a revenue by its id.
         * @param revenueId The revenue to be deleted.
         */
        Revenue.destroy({
            where: {
                id: revenueId
            }
        })
    }

    findById(revenueId) {
        /**
         * Search for a revenue by its id.
         * @param revenueId The id to search for.
         */
        return Revenue.findAll({
            where: {
                id: revenueId
            }
        })
    }

    findAll() {
        /**
         * Returns every revenue.
         */
        return Revenue.findAll()
    }
}

module.exports = RevenueRepository