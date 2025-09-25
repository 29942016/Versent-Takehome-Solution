import fs from 'fs';
import type { Location } from '../models/location.ts';

// Typically this would be our data access layer.
const data: Location[] = JSON.parse(fs.readFileSync('data.json', 'utf8'));

class LocationService {
    
    constructor() { }

    // Returns the entire dataset, used for testing.
    getAll() {
        return data;
    }

    // Given a name and date, find all the locations they were present at.
    getPresentLocationsAtTime(name: string, date: string | Date) {
        const presentLocations: string[] = [];

        // For each location determine if our target was present.
        data.forEach(location => {

            // Check if a location had the person present at all.
            const wasPresentAtLocation = location.persons.filter(p => p.person === name);

            // Check if the person was present at the specified date.
            const wasPresentAtDate = wasPresentAtLocation.filter(l => l.dates.find(d => 
                    new Date(d).getTime() === new Date(date).getTime())
            ).length !== 0;

            // If they were, then add them to the collection and go to next location.
            if(wasPresentAtDate) {
                presentLocations.push(location.location);
            }
        });

        return presentLocations;
    }
};

export default LocationService;