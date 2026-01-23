import httpStatus from 'http-status';
import bcrypt,{hash} from 'bcryptjs';
import {User} from '../models/user.model.js';
import crypto from 'crypto';

const login=async(req,res)=>{
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'Username and password are required' });
    }
    try{
        const user=await User.findOne({username:username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send({ error: 'User not found' });
        }
       if(await bcrypt.compare(password,user.password)){
         let token =crypto.randomBytes(16).toString('hex');
         user.token=token;
         await user.save();
         return res.status(httpStatus.OK).send({ token: token });
        }
    }catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Login failed' });
    }
}

const register=async(req,res)=>{
    const { name,username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).send({ error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ name:name, username:username, password: hashedPassword });
        await newUser.save();
        res.status(httpStatus.CREATED).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Registration failed' });
    }
}
export {login,register};