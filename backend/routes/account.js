import express, { Router } from "express";
import { balance } from "../controllers/balance.js";
import { authentication } from "../middlewares/authenticate.js";
import { transfer } from "../controllers/transfer.js";

const accountRouter = Router();

accountRouter.use((req, res, next) => {
    express.json()(req, res, err => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Invalid JSON format" });
        }
        next();
    });
});

accountRouter.get('/balance', authentication, balance);
accountRouter.post('/transfer', authentication, transfer);

export { accountRouter };