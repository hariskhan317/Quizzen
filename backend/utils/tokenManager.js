import jwt from 'jsonwebtoken'

export const createToken = (name, email) => {
    const payload = { name, email };
    const token = jwt.sign(payload, process.env.JWT_TOKEN);
    return token;
}

