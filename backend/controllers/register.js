import bcrypt from 'bcrypt';
import { registerBody } from '../validators/user_validation.js';
import { Account, User } from '../models/user_model.js';

export async function register(req, res) {
    try {
        // validating the body
        if (!registerBody.safeParse(req.body).success) {
            return res.status(411).json({
                message: "Invalid Inputs",
            });
        }

        const { firstName, lastName, email, password } = req.body;
        // check if user is already registered
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({
                message: "User already exists",
            });
        };

        // hashing the password
        const hashPassword = await bcrypt.hash(password, 10);
        // creating a new User
        const user = await User.create({
            firstName, lastName, email, password: hashPassword
        });

        // opening an account
        await Account.create({
            userId: user._id,
            balance: 1 + Math.random() * 10000
        });

        res.status(201).json({
            message: "User created successfully",
        });
    }
    catch (err) {
        console.log(`Something went wrong ${err}`);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}