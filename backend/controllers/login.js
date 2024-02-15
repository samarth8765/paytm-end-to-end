import bcrypt from 'bcrypt';
import { loginBody } from '../validators/user_validation.js';
import { User } from '../models/user_model.js';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
    try {
        // validating the body
        if (!loginBody.safeParse(req.body).success) {
            return res.status(411).json({
                message: "Incorrect Inputs",
            });
        }

        const { email, password } = req.body;

        // check if user exists registered
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({
                message: "User does not exists",
            });
        };

        // comparing the password
        const matchPassword = await bcrypt.compare(password, userExists.password);

        if (!matchPassword) {
            return res.status(401).json({
                message: "Incorrect Password",
            });
        }

        jwt.sign({ id: userExists._id, email: userExists.email }, process.env.JWT_ACCESS_TOKEN, (err, token) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: "An error occured",
                })
            }

            return res.status(200).json({
                message: "Login successfully",
                token: token
            });
        });
    }
    catch (err) {
        console.log(`Something went wrong ${err}`);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}