const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.userLogin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            const validPass = bcrypt.compareSync(password, userExist.password);
            if (validPass) {
                const token = jwt.sign({
                    id: userExist._id,
                    isAdmin: userExist.isAdmin
                }, 'jsonToken');
                return res.status(200).json({
                    token,
                    email,
                    shippingAddress: userExist.shippingAddress,
                    isAdmin: userExist.isAdmin
                });
            }
            else {
                return res.status(401).json({
                    status: 'error',
                    message: "Check your Credential"
                });
            }
        }
        else {
            return res.status(404).json({
                status: 'error',
                message: "User doesn't exist"
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            status: 'error',
            message: `${err}`
        });
    }
}


module.exports.userRegister = async (req, res) => {
    const { email, password, fullname } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                status: "error",
                message: "User already exist"
            });
        }
        else {
            const hashPass = await bcrypt.hash(password, 12);

            await User.create({
                email,
                password: hashPass,
                fullname
            })
            return res.status(200).json({
                status: "success",
                message: "Successfully Register"
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            status: 'error',
            message: `${err}`
        });
    }
}


module.exports.userUpdate = async (req, res) => {

    try {
        const userExist = await User.findOne({ _id: req.userId });
        if (userExist) {
            userExist.fullname = req.body.fullname || userExist.fullname;
            userExist.email = req.body.email || userExist.email;
            userExist.shippingAddress = req.body.shippingAddress || userExist.shippingAddress;
            userExist.save();
            return res.status(201).json({
                status: "success",
                message: "Successfully Update"
            });
        }
        else {
            return res.status(404).json({
                status: "error",
                message: "User Not Found"
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            status: 'error',
            message: `${err}`
        });
    }
}


module.exports.getAllUsers = async (req, res) => {

}