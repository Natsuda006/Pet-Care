const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET || "mysecretkey";

exports.register = async (req, res) => {
    const { username, password, role, roles } = req.body;

    console.log("DEBUG REGISTER BODY:", req.body);

    if (!username || !password) {
        return res.status(400).send({
            message: "Please provide username and password",
        });
    }

    let userRoles = ["user"]; 

    if (roles) {
        userRoles = Array.isArray(roles) ? roles : [roles];
    } else if (role) {
        userRoles = [role];
    }

    
    userRoles = userRoles.map(r => String(r).toLowerCase().trim());

    console.log("PROCESSED ROLES:", userRoles);

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        return res.status(400).send({
            message: "This username is already existed",
        });
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await UserModel.create({
            username,
            password: hashedPassword,
            roles: userRoles, 
        });

        console.log("CREATED USER:", user);

        res.status(201).send({
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).send({
            message: error.message || "Some errors occurred while registering a new user",
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({
            message: "Please provide username and password",
        });
    }
    try {
        const userDoc = await UserModel.findOne({ username });
        if (!userDoc) {
            return res.status(404).send({ message: "User not found" });
        }
        const isPasswordMatched = bcrypt.compareSync(password, userDoc.password);
        if (!isPasswordMatched) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

     
        const tokenPayload = {
            id: userDoc._id,
            username: userDoc.username,
            roles: userDoc.roles  
        };

        jwt.sign(tokenPayload, secret, {}, (err, token) => {
            if (err) {
                return res.status(500).send({
                    message: "Internal server error: Authentication failed",
                });
            }
            res.send({
                message: "User logged in successfully",
                id: userDoc._id,
                username,
                roles: userDoc.roles,
                accessToken: token,
            });
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some errors occurred while logging in user",
        });
    }
};
