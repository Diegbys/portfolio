import Conversation from '../../../src/models/Conversation';
import Chat from '../../../src/models/Chat';
import ConnectDB from '../../../src/lib/dbConnect';
import mongoose from 'mongoose';

export default async function handler(req, res) {
    await ConnectDB();
    const { method, query: { id } } = req;
    switch (method) {

        case 'GET':
            try {

                const conversation = await Conversation.find({
                    members: { $in: new mongoose.Types.ObjectId(id) }
                }).populate('members', {
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                });

                // conversation.fore
                const chat = await Chat.find({ conversation_id: conversation[0]._id }).limit(1).sort({createdAt: -1});
                console.log(chat);

                return res.status(200).json({ success: true, conversation });

            } catch (error) {
                console.log(error);
                return res.status(404).json({ success: false, error });
            }

        case 'DELETE':
            try {

                let conversation = await Conversation.findByIdAndDelete(id);

                await Chat.deleteMany({ conversation_id: new mongoose.Types.ObjectId(id) });

                return res.status(200).json({ success: true, conversation });
            } catch (error) {
                console.log(error);
            }

        default:
            return res.status(500).json({ success: false, error: 'Falla en el servidor' });
    }
}
