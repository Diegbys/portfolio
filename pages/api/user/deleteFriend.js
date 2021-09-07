import ConnectDB from '../../../src/lib/dbConnect';
import User from '../../../src/models/User';
import mongoose from 'mongoose';

export default async function handler(req, res) {
    await ConnectDB();

    try {

        const user = await User.findById(req.body.userId);
        const friend = await User.findById(req.body.friendId);

        user.friends.pull(new mongoose.Types.ObjectId(req.body.friendId));
        friend.friends.pull(new mongoose.Types.ObjectId(req.body.userId));

        await user.save();
        await friend.save();

        return res.status(200).json({ success: true, id: req.body.friendId });

    } catch (error) {
        console.log(error);
    }
}