import Listing from "../models/listing.model.js";
import { errorHandler } from '../utils/error.js';

export const createListing = async (request, response, next) => {
    try {
        const listing = await Listing.create(request.body);
        return response.status(201).json(listing);
    }

    catch (error) {
        next(error);
    }
};


export const deleteListing = async (request, response, next) => {
    const listing = await Listing.findById(request.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if (request.id === listing.userRef) {
        return next(errorHandler(401, 'You can only delete a listing that is created by you!'));
    }

    try {
        await Listing.findByIdAndDelete(request.params.id);
        response.status(200).json('The listing has been successfully deleted!')
    }

    catch (error) {
        next(error);
    }
};


export const updateListing = async (request, response, next) => {
    const listing = await Listing.findById(request.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if (request.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You are not allowed to update listings that are not created by you!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            request.params.id, 
            request.body,  
            { new: true }
        );

        response.status(200).json(updatedListing);
    }

    catch (error) {
        next(error);
    }
};


export const getListing = async (request, response, next) => {
    try {
        const listing = await Listing.findById(request.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }

        response.status(200).json(listing);
    }

    catch (error) {
        next(error);
    }
}


export const getListings = async (request, response, next) => {
    try {
        const limit = parseInt(request.query.limit) || 9;
        const startIndex = parseInt(request.query.startIndex) || 0;
        
        let offer = request.query.offer;
        if (offer === 'undefined' || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = request.query.furnished;
        if (furnished === 'undefined' || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = request.query.parking;
        if (parking === 'undefined' || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = request.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }
    } 
    
    catch (error) {
        next(error);
    }
}