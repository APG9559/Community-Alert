const User = require('../models/user');

const authAdmin = async (req, res, next) => {
    try{
        const user = await User.findOne({
                _id: req.user.id
        })

        if(user.role === 0) return res.status(400).json({msg:'Admin resource access denied'})

        next();
    }
    catch(err)
    {
        return res.status(400).json({msg:err.message})
    }
}

module.exports = authAdmin