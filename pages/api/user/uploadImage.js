import ConnectDB from '../../../src/lib/dbConnect';
import User from '../../../src/models/User';
import mongoose from 'mongoose';
import Axios from 'axios';

export default async function handler(req, res) {
    await ConnectDB();

    try {

        const user = await User.findOneAndUpdate({ _id: req.body.id }, { imgUrl: req.body.imgUrl });

        return res.status(200).json({ success: true });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
    }
}