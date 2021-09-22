
import ConnectDB from '../../../src/lib/dbConnect';
import User from '../../../src/models/User';

export default async function handler(req, res) {

    await ConnectDB();

    try {
        const user = await User.findById(req.body.id, 'friendsRequests').populate('friendsRequests', {
            firstName: 1,
            lastName: 1,
            email: 1,
            imgUrl: 1
        }).lean();

        return res.status(200).json({
            success: true,
            friendsRequests: user.friendsRequests,
            total: user.friendsRequests.length
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error, message: 'Error conection' });
    }
}