interface ILocalEvent {
    id: string;
    title: string;
    details: string;
}

export default class LocalEvent implements ILocalEvent {
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