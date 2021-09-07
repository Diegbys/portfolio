import Chat from '../../../src/models/Chat';
import ConnectDB from '../../../src/lib/dbConnect';

export default async function handler(req, res) {
    await ConnectDB();
    const { method, query: { conversationId } } = req;
    switch (method) {

        case 'GET':
            try {

                const messages = await Chat.find({ conversation_id: conversationId });
                return res.status(200).json({ success: true, messages });

            } catch (error) {
                console.log(error);
                return res.status(404).json({ success: false, messages });
            }

        default:
            return res.status(500).json({ success: false, error: 'Falla en el servidor' });
    }
}
