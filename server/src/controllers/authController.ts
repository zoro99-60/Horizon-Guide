import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const { authenticator } = require("otplib");
import qrcode from "qrcode";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.isTwoFactorEnabled) {
            return res.json({
                message: "2FA Required",
                requires2FA: true,
                userId: user._id
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const setup2FA = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body; // In real app, get from auth middleware
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const secret = authenticator.generateSecret();
        user.twoFactorSecret = secret;
        await user.save();

        const otpauth = authenticator.keyuri(user.email, "HorizonGuide", secret);
        const qrCodeUrl = await qrcode.toDataURL(otpauth);

        res.json({ secret, qrCodeUrl });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verify2FA = async (req: Request, res: Response) => {
    try {
        const { userId, token } = req.body;
        const user = await User.findById(userId);
        if (!user || !user.twoFactorSecret) {
            return res.status(400).json({ message: "2FA not set up" });
        }

        const isValid = authenticator.check(token, user.twoFactorSecret);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid 2FA code" });
        }

        user.isTwoFactorEnabled = true;
        await user.save();

        const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ token: jwtToken, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
