import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: [true, "is required"],
        ref: 'User'
    },
    last: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Chat'
    }
}, { timestamps: true });

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);