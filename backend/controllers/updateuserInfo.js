import { User } from '../models/user_model.js';
import { updateBody } from '../validators/user_validation.js';
import bcrypt from 'bcrypt';

export async function updateInfo(req, res) {
    try {
        if (!updateBody.safeParse(req.body).success) {
            return res.status(411).json({
                meesage: "Invalid Inputs",
            });
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        console.log(req.body.password);
        await User.updateOne({ _id: req.user.id }, { $set: req.body });

        return res.status(201).json({
            message: "Update successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.status()
    }
} 