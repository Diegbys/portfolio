import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "is required"]
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "is required"]
    },
    text: {
        type: String,
        required: [true, "is required"]
    }
}, { timestamps: true });

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);