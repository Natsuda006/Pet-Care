const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET || "mysecretkey";

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send({ message: "Token is missing" });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(403).send({ message: "Access Forbidden" });
        req.id = decoded.id;
        req.roles = decoded.roles; 
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (!req.roles || !req.roles.includes("admin")) {
        return res.status(403).send({ message: "Require Admin Role!" });
    }
    next();
};

const authJwt = {
    verifyToken,
    isAdmin
};
module.exports = authJwt;
