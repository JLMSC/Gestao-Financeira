const Expense = require('../model/Expense')

/**
 * Represents a CRUD for Expense.
 */
class ExpenseRepository {
    insert(newExpense) {
        /**
         * Insert a expense into the table.
         * @param newExpense The expense to be inserted into.
         */
        const expense = Expense.create({
            title: newExpense.title,
            value: newExpense.value
        })
        return expense
    }

    update(expense, expenseId) {
        /**
         * Update a expense.
         * @param expense The expense to be updated.
         * @param expenseId The expense's id to search for.
         */
        return Expense.update({
            value: expense.value,
            title: expense.title
        }, {
            where: {
                id: expenseId
            }
        })
    }

    deleteById(expenseId) {
        /**
         * Delete a expense by its id.
         * @param expenseId The expense to be deleted.
         */
        Expense.destroy({
            where: {
                id: expenseId
            }
        })
    }

    findById(expenseId) {
        /**
         * Search for a expense by its id.
         * @param expenseId The id to search for.
         */
        return Expense.findAll({
            where: {
                id: expenseId
            }
        })
    }

    findAll() {
        /**
         * Returns every expense.
         */
        return Expense.findAll()
    }
}

module.exports = ExpenseRepository