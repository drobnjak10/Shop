const jwt = require('jsonwebtoken')

exports.isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if(!authorization) {
            return res.json({ error: "Please login to access." });
        } 
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX


        if (!token) {
            return res.json({ error: "Please login to access." });
        }

   

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);


        req.user = { _id: decoded._id, username: decoded.username, role: decoded.role }

        next();
    } catch (error) {
        res.json({ error: error.message })
    }
}


exports.authorizeRoles = async (req, res, next) => {
    const authorization = req.headers.authorization;
    let token;
    if(authorization) {
        token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
        return res.json({ error: `Role: ${req.user.role} is not allowed to access this resouce` });
    }

    console.log(token);
    next();
}
