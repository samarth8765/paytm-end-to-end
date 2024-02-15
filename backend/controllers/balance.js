import { Account } from "../models/user_model.js";

export async function balance(req, res) {
    try {
        const { balance } = await Account.findOne({ userId: req.user.id });
        res.status(200).json({
            balance
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}