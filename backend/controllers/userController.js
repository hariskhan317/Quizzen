import { User } from '../models/user.js'
import { createToken } from '../utils/tokenManager.js'
import bcrypt from 'bcrypt'

export const getUser = async (req, res) => {
    const user = await User.find();
    return res.status(200).send(user)
}

export const authStatusHandler = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("Cant Find the user")
        }

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Not the same user")
        }
        
        return res.status(200).json({ status: 200, name: user.name, email: user.email });

    } catch (error) { 
        return res.status(404).send({ message: "NOT_FOUND 404 Authentication failed", cause:error.message })
    }
} 

export const userSignup = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("User Already exist")
        }
    
        const hashPassword = await bcrypt.hash(password, 10)
    
        const user = new User({name, email, password: hashPassword})

        res.clearCookie('auth_token', { 
            httpOnly: true,
            sameSite: 'Strict',  
            // secure: process.env.NODE_ENV === 'production',
        })
        const token = createToken(user._id, user.email);
    
        res.cookie('auth_token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'Strict',  
            // secure: process.env.NODE_ENV === 'production',
        })
        
        await user.save();

        return res.status(200).send({message:"Successfully created the user", name: user.name, email: user.email})
    } catch (error) { 
        return res.status(404).send({ message: "NOT_FOUND 404 Signin error", cause:error.message })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Cant Find the user")
        }
    
        const verifyPassword = await bcrypt.compare(password, user.password)

    
        if (!verifyPassword) {
            return res.status(401).send("Can not verify the Password, Try Again")
        }

        res.clearCookie('auth_token', { 
            httpOnly: true,
            sameSite: 'Strict',  
            // secure: process.env.NODE_ENV === 'production',
        }) 
        const token = createToken(user._id, user.email);

        res.cookie('auth_token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'Strict',  
            // secure: process.env.NODE_ENV === 'production',
        })

        return res.status(200).send({message:"Successfully Login", name: user.name, email: user.email})
    } catch (error) { 
        return res.status(404).send({ message: "NOT_FOUND 404 login error", cause:error.message })
    }
}

export const userLogout = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("Cant Find the user")
        }

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Not the same user")
        }
        res.clearCookie('auth_token', { 
            httpOnly: true,
            sameSite: 'Strict',  
            // secure: process.env.NODE_ENV === 'production',
        }) 
    
        return res.status(200).send("Successfully Logout")
    } catch (error) { 
        return res.status(404).send({ message: "NOT_FOUND 404", cause:error.message })
    }
}

// const status = {
//   SUCCESS: 200,
//   CREATED: 201,
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   METHOD_NOT_ALLOWED: 405,
//   INTERNAL_SERVER_ERROR: 500,
// };