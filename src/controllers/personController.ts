import type { Request, Response, NextFunction } from 'express';
import PersonService from "../services/personService.ts";

const service = new PersonService();

/* 
    GET /api/persons/{location}/{date}
    @param location Only include persons present at this location.
    @param date Only include persons present during this time.
    Return a list of persons present at the specified date and time.
*/
export const getPresentAtTime = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { location, date } = req.params;

        if(location === undefined) {
            res.status(404).json({message: "Missing 'Location' parameter."});
            return;
        }
        if(date === undefined) {
            res.status(404).json({message: "Missing 'Date' parameter."});
            return;
        }

        res.json(service.getPresentAtTime(location, date));
    } catch(error) {
        next(error);
    }
}

/* 
    /api/closeContacts/{name}/{date}
    @param name The name of the person to be checked for close contact encounters.
    @param date Only include other people present during this time.
    Returns a collection of CloseContact objects.
*/
export const getCloseContacts = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, date } = req.params;

        if(name === undefined) {
            res.status(404).json({message: "Missing 'Location' parameter."});
            return;
        }
        if(date === undefined) {
            res.status(404).json({message: "Missing 'Date' parameter."});
            return;
        }

        res.json(service.getCloseContacts(name, date));
    } catch(error) {
        next(error);
    }
}