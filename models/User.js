const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required.'],
            trim: true
        },
        email: {
            type: String ,
            unique: true,
            // required: 'Username is required.',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            }
          ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User'
            }
          ]
    },
    {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;