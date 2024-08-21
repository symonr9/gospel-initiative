interface ILeader {
    id: string;
    name: string;
    details: string;
    type: LeaderType;
}

export default class Leader implements ILeader {
    id: string;
    name: string;
    details: string;
    type: LeaderType;

    constructor(id: string, name: string, details: string, type: LeaderType
    ) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.type = type;
    }

}