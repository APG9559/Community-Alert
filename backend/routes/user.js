const express = require('express')
const User = require('../models/user.js')
const router = express.Router()



// module.exports = router;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res) =>{
    try {
        console.log("Hello")
        const { name, email, password, mobile,role = 0} = req.body;

        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email is already registered' });
        }
        
        console.log("hello 2")
        // Password encryption
        const passwordhash = await bcrypt.hash(password, 10);
        req.body.password = passwordhash
        // Save to the DB
        
        const newUser = new User({
            name, email, password: passwordhash, mobile, role
        });

        await newUser.save();
        console.log("hello 3")
        // Create JWTs for authentication
        const accesstoken = createAccessToken({ id: newUser._id });
        const refreshtoken = createRefreshToken({ id: newUser._id });
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            secure: process.env.NODE_ENV === 'production', // Ensure cookies are secure in production
            sameSite: 'strict'
        });
        
        res.json({ accesstoken });

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
})

router.post('/login' , async (req,res) =>{
    try {
                const { email, password } = req.body;
    
                const user = await User.findOne({ email });
                if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    
                // Create JWTs for authentication
                const accesstoken = createAccessToken({ id: user._id });
                const refreshtoken = createRefreshToken({ id: user._id });
                res.cookie('refreshtoken', refreshtoken, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });
                res.json({ accesstoken });
                res.status(200).json({isLogin : 'success'})
    
            } catch (err) {
                return res.status(400).json({ msg: err.message });
            }
})


router.post('/refreshToken' ,(req,res) => {
    try {
            const rf_token = req.cookies.refreshtoken;

            if (!rf_token) return res.status(401).json({ msg: 'Please login or register' });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(401).json({ msg: 'Invalid refresh token' });

                // Generate a new access token
                const accesstoken = createAccessToken({ id: user.id });
                res.json({ accesstoken });
            });

            return res;
        } catch (err) {
            return res.status(400).json({ msg: err.message });
        }
})

router.get('/logout',(req,res) =>{
    
    try {
        res.clearCookie('refreshtoken', {
            path: '/user/refresh_token',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        return res.status(200).json({ msg: 'You are logged out successfully' })
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

// const usectrl = {
    // register: async (req, res) => {
    //     try {
    //         const { name, email, password, mobile } = req.body;

    //         const user = await Users.findOne({ email });
    //         if (user) {
    //             return res.status(400).json({ msg: 'Email is already registered' });
    //         }

    //         // Password encryption
    //         const passwordhash = await bcrypt.hash(password, 10);

    //         // Save to the DB
    //         const newUser = new Users({
    //             name, email, password: passwordhash
    //         });

    //         await newUser.save();

    //         // Create JWTs for authentication
    //         const accesstoken = createAccessToken({ id: newUser._id });
    //         const refreshtoken = createRefreshToken({ id: newUser._id });
    //         res.cookie('refreshtoken', refreshtoken, {
    //             httpOnly: true,
    //             path: '/user/refresh_token',
    //             secure: process.env.NODE_ENV === 'production', // Ensure cookies are secure in production
    //             sameSite: 'strict'
    //         });
    //         res.json({ accesstoken });

    //     } catch (error) {
    //         return res.status(400).json({ msg: error.message });
    //     }
    // },

    // refreshtoken: async (req, res) => {
        // try {
        //     const rf_token = req.cookies.refreshtoken;

        //     if (!rf_token) return res.status(401).json({ msg: 'Please login or register' });

        //     jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        //         if (err) return res.status(401).json({ msg: 'Invalid refresh token' });

        //         // Generate a new access token
        //         const accesstoken = createAccessToken({ id: user.id });
        //         res.json({ accesstoken });
        //     });
        // } catch (err) {
        //     return res.status(400).json({ msg: err.message });
        // }
    // },

    // login: async (req, res) => {
    //     try {
    //         const { email, password } = req.body;

    //         const user = await Users.findOne({ email });
    //         if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    //         const isMatch = await bcrypt.compare(password, user.password);
    //         if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    //         // Create JWTs for authentication
    //         const accesstoken = createAccessToken({ id: user._id });
    //         const refreshtoken = createRefreshToken({ id: user._id });
    //         res.cookie('refreshtoken', refreshtoken, {
    //             httpOnly: true,
    //             path: '/user/refresh_token',
    //             secure: process.env.NODE_ENV === 'production',
    //             sameSite: 'strict'
    //         });
    //         res.json({ accesstoken });

    //     } catch (err) {
    //         return res.status(400).json({ msg: err.message });
    //     }
    // },

    // logout: async (req, res) => {
    //     try {
    //         res.clearCookie('refreshtoken', {
    //             path: '/user/refresh_token',
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === 'production',
    //             sameSite: 'strict'
    //         });
    //         return res.status(200).json({ msg: 'You are logged out successfully' });
    //     } catch (err) {
    //         return res.status(400).json({ msg: err.message });
    //     }
    // },

    // getUser: async(req, res) => {
    //     try{
    //         const user = await Users.findById(req.user.id).select('-password')
    //         if(!user) return res.status(400).json({msg:'User Not Found '})
    //         res.json(user)
    //     }catch(err)
    //     {
    //         res.json({msg:err.message})
    //     }
    // },
// };

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = router;