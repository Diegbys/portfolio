import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "is required"]
    },
    lastName: {
        type: String,
        required: [true, "is required"]
    },
    email: {
        type: String,
        required: [true, "is required"]
    },
    text: {
        type: String,
        required: [true, "is required"]
    },
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);