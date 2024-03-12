import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (request, response, next) => {
    try {
        const listing = await Listing.create(request.body);
        return response.status(201).json(listing);
    }

    catch (error) {
        next(error);
    }
};


export const deleteListingListing = async (request, response, next) => {
    const listing = await Listing.findById(request.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if (request.id === listing.userRef.toString()) {
        return next(errorHandler(401, 'You can only delete a listing that is created by you!'));
    }
}