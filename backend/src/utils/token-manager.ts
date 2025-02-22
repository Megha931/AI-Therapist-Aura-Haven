import { Request, Response, NextFunction } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import dotenv from "dotenv";

dotenv.config(); 


const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

/**
 * Generate a JWT token.
 * @param id - User ID
 * @param email - User email
 * @param expiresIn - Expiration time (default: "1h")
 * @returns Signed JWT token
 */
export const createToken = (id: string, email: string, expiresIn: string | number = "1h"): string => {
    const payload = { id, email };

   
    let formattedExpiresIn: string | number = typeof expiresIn === "number" ? expiresIn : expiresIn.toString();

    const signOptions: SignOptions = {
        expiresIn: formattedExpiresIn as SignOptions["expiresIn"], 
    };

    return jwt.sign(payload, JWT_SECRET, signOptions);
};


/**
 * Middleware to verify JWT token from cookies.
 */
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.signedCookies?.[COOKIE_NAME];

        if (!token || token.trim() === "") {
            return res.status(401).json({ message: "Token Not Received" });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token Expired or Invalid" });
            }

            res.locals.jwtData = decoded; 
            return next();
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
