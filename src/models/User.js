import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "is required"],

    },
    firstName: {
        type: String,
        required: [true, "is required"]
    },
    lastName: {
        type: String,
        required: [true, "is required"]
    },
    password: {
        type: String,
        required: [true, "is required"]
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendsRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default mongoose.models.User || mongoose.model('User', UserSchema);