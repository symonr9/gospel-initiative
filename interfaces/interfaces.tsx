import { Role } from "@/enums/enums";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: Role; // Enum for roles
    createdAt: Date;
}

export interface IOne {
    id: string;
    name: string;
}