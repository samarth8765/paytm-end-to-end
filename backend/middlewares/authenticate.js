import jwt from 'jsonwebtoken';

export async function authentication(req, res, next) {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(403).json({
                message: "Invalid token",
            });
        }

        token = token.split(' ')[1];

        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(403).json({
                    message: "Invalid token",
                });
            }
            req.user = data;
            next();
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        })
    }
}