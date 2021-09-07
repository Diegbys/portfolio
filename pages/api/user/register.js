import ConnectDB from '../../../src/lib/dbConnect';
import User from '../../../src/models/User';

export default async function handler(req, res){
    await ConnectDB();

    try {
        const user = new User(req.body);
        const usersCreated = await User.find({email: req.body.email}).lean();

        if (usersCreated.length > 0) {
            return res.status(400).json({ success: false, message: 'Ya existe un usuario con este email, intenta con otro' });
        }

        await user.save();
        
        return res.status(200).json({ success: true, user: user[0] })
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, error, message: 'Error conection'});
    }
}