import ConnectDB from '../../../src/lib/dbConnect';
import User from '../../../src/models/User';
import mongoose from 'mongoose';

export default async function handler(req, res) {
    await ConnectDB();

    try {

        const user = await User.findOne({ _id: req.body.userId });
        user.friendsRequests.pull(new mongoose.Types.ObjectId(req.body.requesterId));
        let message = "Rejected request";

        if (req.body.action == "accept") {
            const userRequester = await User.findOne({ _id: req.body.requesterId });

            user.friends.push(new mongoose.Types.ObjectId(req.body.requesterId));
            userRequester.friends.push(new mongoose.Types.ObjectId(req.body.userId));

            await userRequester.save();

            message = "Request accepted";
        }

        await user.save();

        return res.status(200).json({ success: true, message });

    } catch (error) {
        console.log(error);
    }
}