const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    deleteUsers
} = require('../../controllers/user');

router
    .route('/')
    .get(getAllUsers)
    .post(addUser)
    .delete(deleteUsers)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;