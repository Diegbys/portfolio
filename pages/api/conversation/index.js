import ConnectDB from '../../../src/lib/dbConnect';
import Conversation from '../../../src/models/Conversation';
import mongoose from 'mongoose';

export default async function handler(req, res) {

    await ConnectDB();

    const newConversation = new Conversation({
        members: [new mongoose.Types.ObjectId(req.body.senderId), new mongoose.Types.ObjectId(req.body.receiverId)]
    })

    try {

        const savedConversation = await newConversation.save();
        return res.status(200).json({ success: true, conversation: savedConversation })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error, message: 'Error conection' });
    }
}