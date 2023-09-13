


module.exports.adminCheck = (req, res, next) => {
    // console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization;
        if (token) {
            const decode = jwt.decode(token, 'jsonToken');

            switch (decode?.isAdmin) {
                case true:
                    return next();
                default:
                    return res.status(401).json({
                        status: "error",
                        message: "Not Authorized "
                    });
            }
        }
        else { 
            return res.status(401).json({
                status: "error",
                message: "Token not Valid "
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: "This is middleware "
        });
    }
}