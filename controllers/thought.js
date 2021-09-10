const { User, Thought } = require('../models');

const thoughtController = {
    
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            selects: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
    },
    
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id})
        .populate({
            path: 'reactions',
            selects: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
    },
    
    addThought({ body }, res) {
        console.log('1', body)
        Thought.create(body)
            .then(({ _id }) => {
                console.log('1')
                return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
                );
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    },

    addReaction({ params, body }, res) {
        Reaction.create(body)
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => res.json(err))
    },

    deleteReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.id })
        .then(dbReactionData => res.json(dbReactionData))
        .catch(err => res.json(err))
    },
};

module.exports = thoughtController;