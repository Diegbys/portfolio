
import ConnectDB from '../../../src/lib/dbConnect';
import User from '../../../src/models/User';

export default async function handler(req, res) {

    await ConnectDB();
    
    try {
        const user = await User.findById(req.body.id, 'friends').populate('friends', {
            firstName: 1,
            lastName: 1,
            email: 1,
        }).lean();

        return res.status(200).json({ success: true, friends: user.friends })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error, message: 'Error conection' });
    }
}