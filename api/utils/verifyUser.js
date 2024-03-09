import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (request, response, next) => {
    const token = request.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unauthorized: User lacks the necessary permissions to access this resource.'));
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return next(errorHandler(403, 'Forbidden: Access to the requested resource is not allowed.'));
        }

        request.user = user;
        next();
    });
};