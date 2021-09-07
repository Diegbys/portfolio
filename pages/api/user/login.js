
import ConnectDB from '../../../src/lib/dbConnect';
import User from '../../../src/models/User';

export default async function handler(req, res) {

    await ConnectDB();

    try {
        const user = await User.find({ email: req.body.email });

        if (user.length == 0) {
            return res.status(400).json({ success: false, message: 'Ususario no encontrado' });
        }

        if (user[0].password != req.body.password) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        }

        return res.status(200).json({ success: true, user: user[0] })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error, message: 'Error conection' });
    }
}