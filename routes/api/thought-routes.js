const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;