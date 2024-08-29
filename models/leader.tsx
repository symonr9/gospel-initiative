import { LeaderType } from "@/enums/enums";

interface ILeader {
    id: string;
    name: string;
    details: string;
    type: LeaderType;
    email: string;
    phone: string;
}

export default class Leader implements ILeader {
    id: string;
    name: string;
    details: string;
    type: LeaderType;
    email: string;
    phone: string;

    constructor(id: string, name: string, details: string, type: LeaderType,
        email: string, phone: string
    ) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.type = type;
        this.email = email;
        this.phone = phone;
    }

}