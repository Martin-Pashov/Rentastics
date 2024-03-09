import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from '../models/user.model.js';

export const test = (request, response) => {
    response.json({
        message: 'api route is working',
    });
};


export const updateUserInfo = async (request, response, next) => {
    if (request.user.id !== request.params.id) {
        return next(errorHandler(401, 'Unauthorized: You can only update your own account.'));
    }

    try {
        if (request.body.password) {
            request.body.password = bcryptjs.hashSync(request.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set: {
                username: request.body.username,
                email: request.body.email,
                password: request.body.password,
                avatar: request.body.avatar,
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc
        response.status(200).json({rest})
    }

    catch (error) {
        next(error);
    }
};


export const deleteUser = async (request, response, next) => {
    if (request.user.id !== request.params.id) {
        return next(errorHandler(401, 'Unauthorized: You can only delete your own account.'))
    }

    try {
        await User.findOneAndDelete(request.params.id);
        response.status(200).json('Your account has been successfully deleted. We hope to see you again in the future!');
    }

    catch (error) {
        next(error);
    }
}