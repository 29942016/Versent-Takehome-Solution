import fs from 'fs';
import type { Location } from '../models/location.ts';
import type { CloseContact } from '../models/closeContact.ts';

// Typically this would be our data access layer.
const db: Location[] = JSON.parse(fs.readFileSync('data.json', 'utf8'));

class PersonService {

    constructor() { }

    // Given a location and a date, find all persons that were present.
    getPresentAtTime(location: string, date: Date | string) {
        // Get the reference to the location in the collection.
        const locationIndex = db.findIndex(data => data.location === location);

        // Return if the provided location doesn't exist.
        if(locationIndex === -1) 
            return;

        const attendees: string[] = [];

        // Iterate every person at the location, ensuring they were present at the specified time.
        db[locationIndex]?.persons.forEach(p => {
            if(p.dates.findIndex((d => new Date(d).getTime() === new Date(date).getTime())) !== -1) {
                attendees.push(p.person);
            }
        })

        return attendees;
    }
    
    // Given a name and a date, find all other persons that were present 
    // at the same location and the same time.
    getCloseContacts(name: string, date: Date | string) {
        // find all the other people who were at the same place at the same time
        const closeContacts: CloseContact[] = [];

        // Iterate every location point
        db.forEach(data => {
            // Save an index reference to our target
            const index = data.persons.findIndex(x => x.person === name);

            // If the location doesn't have our target, go to the next location.
            if(index === -1) {
                return;
            }

            // If our target wasn't present at the specified time, go to the next location.
            if(data.persons[index]?.dates.findIndex(x => new Date(x).getTime() === new Date(date).getTime()) == -1) {
                return;
            }

            // Initalise a new close contact object and prepare to add contacts. 
            const newCloseContact: CloseContact = 
            {
                reference: name,
                time: new Date(date),
                location: data.location,
                contacts: [],
            }

            // Iterate all persons at this location.
            data.persons.map(p => {
                // Ignoring our reference person. 
                if(p.person === name)
                    return;

                // Cast the dates for comparison and check they crossed paths.
                const castedDates = p.dates.map(x => new Date(x).getTime());
                if(castedDates.includes(new Date(date).getTime())) {
                    newCloseContact.contacts.push(p.person)
                }
            })

            closeContacts.push(newCloseContact);
        })

        return closeContacts;
    }
}

export default PersonService;