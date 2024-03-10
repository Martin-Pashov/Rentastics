export const createListing = async (request, response, next) => {
    try {
        const listing = await Listing.create(request.body);
    }

    catch (error) {
        next(error);
    }
};