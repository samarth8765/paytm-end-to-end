import mongoose from "mongoose";

export async function connection(url) {
    try {
        await mongoose.connect(url);
        console.log(`DB is ready`);
    } catch (err) {
        console.log(`Something wrong with DB ${err}`);
    }
}