import ConnectDB from '../../../src/lib/dbConnect';
import Chat from '../../../src/models/Chat';

export default async function handler(req, res) {

    await ConnectDB();

    const newChat = new Chat(req.body);

    try {
        await newChat.save();
        return res.status(200).json({ success: true, newChat })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error, message: 'Error conection' });
    }
}