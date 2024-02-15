import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import express, { Router } from 'express';
import { updateInfo } from "../controllers/updateuserInfo.js";
import { authentication } from "../middlewares/authenticate.js";

const router = Router();

router.use((req, res, next) => {
    express.json()(req, res, err => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Invalid JSON format" });
        }
        next();
    });
});

router.post('/register', register);
router.post('/login', login);
router.put('/', authentication, updateInfo);

export { router };