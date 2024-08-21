interface ILocalMinistry {
    id: string;
    title: string;
    details: string;
}

export default class LocalMinistry implements ILocalMinistry {
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