import jwt from 'jsonwebtoken'

export const createToken = (name, email) => {
    const payload = { name, email };
    const token = jwt.sign(payload, process.env.JWT_TOKEN);
    return token;
}

export const verifyToken = async(req, res, next) => {
    const token = await req.cookies.auth_token;
    if (!token) {
        return res.status(422).send("Cant find the token");
    }
    jwt.verify(token, process.env.JWT_TOKEN, (error, success) => {
        if (error) {
            console.log(error);
            return res.status(422).send({ message:"Token verification failed", cause: error.message});
        }
        res.locals.jwtData = success;
        return next();
    })
}