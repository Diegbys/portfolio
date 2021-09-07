import ConnectDB from '../../../src/lib/dbConnect';
import Message from '../../../src/models/Message';

export default async function handler(req, res) {
    await ConnectDB();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const message = new Message(req.body);
                await message.save();
                return res.status(200).json({ success: true, message });

            } catch (error) {
                console.log(error);

                return res.status(400).json({ success: false, error });
            }
        default: return res.status(500).json({ success: false, error });
    }
}