import mongoose from "mongoose";

const user = {
    firstName: {
        type: String,
        requried: true,
    },
    lastName: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        requried: true,
    },
    password: {
        type: String,
        requried: true,
    }
}

const account = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
}

const accountSchema = new mongoose.Schema(account, { timestamps: true });
const userSchema = new mongoose.Schema(user, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export const Account = mongoose.model('Account', accountSchema);
