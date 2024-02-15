import { Account, User } from "../models/user_model.js";
import { transferBody } from "../validators/account_validation.js";

export async function transfer(req, res) {
    try {
        const info = req.body;
        if (!transferBody.safeParse(info).success) {
            console.log(info)
            return res.status(400).json({
                message: "Input Invalidation",
            });
        }

        // check if reciever exists
        const recieverExists = await Account.findOne({ userId: info.to });
        if (!recieverExists) {
            return res.status(403).json({
                message: "Invalid User",
            });
        }

        // Check if amount is sufficient
        const amount = await Account.findOne({ userId: req.user.id });
        if (amount.balance < info.amount) {
            return res.status(400).json({
                message: "Insufficient Balance",
            });
        }

        // updating the sender account by deducting the amount
        await Account.updateOne({ userId: req.user.id },
            {
                $inc: { balance: -info.amount }
            });

        // updating the reciever account by incrementing the amount
        await Account.updateOne({ userId: info.to },
            {
                $inc: { balance: info.amount }
            });

        res.status(200).json({
            message: "Transfer succesfull",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}