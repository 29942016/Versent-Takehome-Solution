export interface CloseContact {
    // A reference to the original person being queried.
    reference: string;
    // The time specified to check for close contact overlaps.
    time: Date;
    // The location specified to check for close contact overlaps.
    location: string;
    // A collection of names of the people who appeared in the same location and time as the reference.
    contacts: string[]
}

