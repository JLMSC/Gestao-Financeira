const Account = require('../model/Account')

/**
 * Represents a CRUD for Account.
 */
class AccountRepository {
    insert(newUser) {
        /**
         * Insert an user into the table.
         * @param newUser The user to be inserted into.
         */
        return Account.create({...newUser})
    }

    update(user, userId) {
        /**
         * Update an user.
         * @param user The user to be updated.
         * @param userId The user's id to search for.
         */
        return Account.update({...user}, {
            where: {
                id: userId
            }
        })
    }

    delete(user) {
        /**
         * Delete an user.
         * @param user The user to be deleted.
         */
        Account.destroy({
            where: {
                id: user
            }
        })
    }

    findById(userId) {
        /**
         * Search for an user by its id.
         * @param userId The id to search for.
         */
        return Account.findAll({
            where: {
                id: userId
            }
        })
    }

    findByUsername(username) {
        /**
         * Search for an user by its username.
         * @param username The username to search for.
         */
        return Account.findAll({
            where: {
                username: username
            }
        })
    }

    findAll() {
        /**
         * Returns every user.
         */
        return Account.findAll()
    }
}

module.exports = AccountRepository