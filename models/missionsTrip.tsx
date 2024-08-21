interface IMissionsTrip {
    id: string;
    title: string;
    details: string;
}

export default class MissionsTrip implements IMissionsTrip {
    id: string;
    title: string;
    details: string;

    constructor(id: string, title: string, details: string
    ) {
        this.id = id;
        this.title = title;
        this.details = details;
    }

}