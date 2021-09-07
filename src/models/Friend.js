import mongoose from 'mongoose';

const FriendSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "is required"]
    },
    friend_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "is required"]
    },
});

export default mongoose.models.Friend || mongoose.model('Friend', FriendSchema);