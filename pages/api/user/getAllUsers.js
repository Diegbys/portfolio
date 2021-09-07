import ConnectDB from '../../../src/lib/dbConnect';
import User from '../../../src/models/User';

export default async function handler(req, res) {
    await ConnectDB();

    try {
        const users = await User.find({});

        if (users.length == 0) {
            return res.status(400).json({ success: false, message: 'No hay usuarios registrados' })
        }

        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
    }
}