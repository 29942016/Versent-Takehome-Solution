import type { Request, Response, NextFunction } from 'express';
import LocationService from '../services/locationService.ts';

const service = new LocationService();

/* 
    /api/locations
    Return a list of all locations in the dataset.
*/
export const get = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(service.getAll());
    } catch(error) {
        next(error);
    }
}

/* 
    /api/locations/{name}/{date}
    @param name Find the person specified by this name.
    @param date Only include persons present during this time.
    Return the location matching the provided name.
*/
export const getByNameAndTime = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, date } = req.params;

        if(name === undefined) {
            res.status(404).json({message: "Missing 'Name' parameter."});
            return;
        }
        if(date === undefined) {
            res.status(404).json({message: "Missing 'Date' parameter."});
            return;
        }

        const presentLocations = service.getPresentLocationsAtTime(name, date);

        res.json((presentLocations.length === 0) 
            ? {message: `${name} was not present at any location during ${date}` }
            : presentLocations
        );

        return;
    } catch(error) {
        next(error);
    }
}