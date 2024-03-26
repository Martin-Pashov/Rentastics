const API_KEY = 'AIzaSyCCiQcXAoDgwxR5iYlj2L0rGscizpWvCps';

export async function getCoordsForAddress(address) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } 
        
        else {
            throw new Error('Coordinates not found');
        }
    } 
    
    catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}
